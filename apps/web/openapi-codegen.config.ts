import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  api: {
    from: {
      source: "url",
      url: "http://localhost:3000/schema.json",
    },
    outputDir: "api",
    to: async (context) => {
      if (context.openAPIDocument.servers) {
        context.openAPIDocument.servers[0].url = 'outra coisa'
      }
      const filenamePrefix = "api";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
