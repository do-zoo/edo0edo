import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'edo0edo',
  title: 'edo0edo CMS',
  projectId: '5jdzjlsh',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: { types: schemaTypes },
});
