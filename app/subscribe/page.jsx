import { SITE, COLORS } from '../../lib/site.config';
import PianoInit from '../../components/PianoInit';

export const metadata = {
  title: `Register — ${SITE.name}`,
};

export default function RegisterPage() {
  return (
    <>
      <PianoInit section="register" />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 0' }}>
        <div className="piano-subscribe" />
      </div>
    </>
  );
}
