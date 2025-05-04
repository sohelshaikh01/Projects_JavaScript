const fs = require('fs');
const path = require('path');

// Directory containing the music files
const directoryPath = 'D:\\APhone Files\\Musics';

// Function to capitalize the first letter of each word
const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Function to rename files in bulk
const bulkRenameFiles = (directory) => {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err);
            return;
        }

        files.forEach((file) => {
            // Extract the extension
            const ext = path.extname(file);
            // Extract the name without the extension
            let fileName = path.basename(file, ext);

            // 1. Replace underscores or hyphens with spaces
            fileName = fileName.replace(/[_-]+/g, ' ');

            // 2. Remove words 'music', 'song', or 'video' in any form (case-insensitive)
            fileName = fileName.replace(/music|full|song|official|video|64|kbps|title|track|A\.|R\.|Lyrical|ft|128|190kbps|pagalworld|.\com|.\se/gi, '');

            // 3. Move any text in parentheses () or square brackets [] to the end
            const parenthesesContent = fileName.match(/\(([^)]+)\)/);
            const bracketContent = fileName.match(/\[([^\]]+)\]/);

            if (parenthesesContent) {
                fileName = fileName.replace(parenthesesContent[0], '').trim(); // Remove parentheses content
                fileName += ` ${parenthesesContent[0]}`; // Add it back at the end
            }

            if (bracketContent) {
                fileName = fileName.replace(bracketContent[0], '').trim(); // Remove bracket content
                fileName += ` ${bracketContent[0]}`; // Add it back at the end
            }

            // 4. Remove any empty parentheses or brackets
            fileName = fileName.replace(/\(\s*\)/g, '').replace(/\[\s*\]/g, '').trim();

            // 5. Replace multiple spaces with a single space
            fileName = fileName.replace(/\s+/g, ' ').trim();

            // 6. Capitalize the first letter of each word
            fileName = capitalizeWords(fileName);

            // 7. Replace spaces with underscores (_)
            const newFileName = fileName.replace(/\s+/g, '_') + ext;

            // Rename the file
            const oldPath = path.join(directory, file);
            const newPath = path.join(directory, newFileName);

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error('Error renaming file:', err);
                } else {
                    console.log(`Renamed: ${file} -> ${newFileName}`);
                }
            });
        });
    });
};

// Run the bulk rename function
bulkRenameFiles(directoryPath);
