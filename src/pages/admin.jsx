import React from 'react';

import Seo from '../components/seo';
import PasswordGate from '../components/admin/passwordGate';
import AdminApp from '../components/admin/adminApp';
import '../scss/_admin.scss';

/**
 * @description The site's admin tool: a password-gated, session-only content/layout
 * editor that outputs full file text to paste into GitHub's web UI. It never writes to
 * the filesystem itself and isn't linked from the public site.
 */
const Admin = () => (
  <>
    <Seo title="Admin" meta={[{ name: 'robots', content: 'noindex,nofollow' }]} />
    <PasswordGate>
      <AdminApp />
    </PasswordGate>
  </>
);

export default Admin;
