import { bodyParserHandler, compressionHandler, corsHandler } from './common';

export default [
  bodyParserHandler, 
  compressionHandler,
  corsHandler, 
];
