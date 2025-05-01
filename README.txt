# Generate Prompt Code Extension

This VSCode extension allows you to select multiple files from the project explorer, combine their contents into a single document, and output it in a format suitable for pasting into a chat UI.

## Features

- Select multiple files using Ctrl+Click or other standard selection methods.
- Right-click on one of the selected files and choose "Generate Prompt Code".
- Combines file contents into a single document with configurable separators.
- Configurable options to include/exclude comments and filenames.

## Extension Settings

This extension contributes the following settings:

- \`generatePromptCode.separator\`: Separator to use between file contents (default: "**********").
- \`generatePromptCode.includeComments\`: Include comments in the generated prompt (default: true).
- \`generatePromptCode.includeFilenames\`: Include filenames at the top of each file segment (default: true).

## Installation

1. Clone or download this repository.
2. Run \`npm install\` in the project directory to install dependencies.
3. Compile the TypeScript code using \`npm run compile\`.
4. Package the extension using \`vsce package\` (requires vsce to be installed globally: \`npm install -g vsce\`).
5. Install the generated \`.vsix\` file in VSCode via the Extensions view.

## Usage

1. Select multiple files in the VSCode Explorer (e.g., using Ctrl+Click).
2. Right-click on one of the selected files.
3. Choose **Generate Prompt Code** from the context menu.
4. A new text document will open with the combined contents of the selected files, formatted according to your configuration settings.
5. Copy the contents and paste them into your desired chat UI.

## Requirements

- VSCode version 1.85.0 or higher.
- Node.js and npm for building the extension.

## Known Issues

- Large files may take longer to process.
- Comment stripping is basic and may not handle all edge cases (e.g., nested comments in some languages).

## Contributing

Feel free to open issues or submit pull requests on the repository.