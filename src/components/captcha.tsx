import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { CAPTCHA_SITEKEY } from '~/constants';
import Checkbox from '~/components/checkbox';
import { Loader2 } from 'lucide-react';
import { mergeRefs } from '~/utils';


interface CaptchaData {
	token: string;
	ekey: string;
}

interface CaptchaProps extends Partial<React.ComponentProps<typeof HCaptcha>> {
	value?: string;
}

const Captcha = forwardRef((props: CaptchaProps, outerRef) => {
	const [captchaData, setCaptchaData] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const ref = useRef<HCaptcha>(null);

	useEffect(() => {
		if (props.value !== captchaData) {
			setCaptchaData(props.value);
		}
	}, [props.value]);

	const handleClick = useCallback(() => {
		if (!ref.current) return;

		setLoading(true);
		ref.current.execute();
	}, [ref.current]);


	return <>
		<div className='flex gap-2 items-center'>
			{loading ? <Loader2 size={16} className='animate-spin' /> : <Checkbox
				onClick={() => !captchaData && handleClick()}
				checked={!!captchaData}
			/>}
			I am not a robot.
		</div>
		<HCaptcha
			{...props}
			ref={mergeRefs(ref, outerRef)}
			sitekey={CAPTCHA_SITEKEY}
			size='invisible'
			onClose={() => {
				setLoading(false);

				try {
					props.onClose?.();
				} catch (error) {
					console.error('Failed to execute captcha onClose callback:', error);
				}
			}}
			onVerify={(token, ekey) => {
				setCaptchaData(token);
				setLoading(false);

				try {
					props.onVerify?.(token, ekey);
				} catch (error) {
					console.error('Failed to execute captcha onVerify callback:', error);
				}
			}}
		/>
	</>;
});

export default Captcha;