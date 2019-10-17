import dotenv from 'dotenv';

dotenv.config();

process.env.PRI_KEY;

export default {
  'type': process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRI_KEY_ID,
  "private_key": process.env.PRI_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URL,
  "token_uri": process.env.TOKEN_URL,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_CERT_URL
}
