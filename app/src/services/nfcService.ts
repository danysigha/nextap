/**
 * Reads data from an NFC card using the browser's Web NFC API.
 *
 * @returns {Promise<string | null>} Resolves with the decoded NFC card data, or `null` if no data is found.
 * @throws Will throw an error if NFC is not supported, or if the reading process fails.
 */
export const readNfcCard = async (): Promise<string | null> => {
  if ("NDEFReader" in window) {
    try {
      const nfcReader = new (window as any).NDEFReader();
      await nfcReader.scan(); // Start scanning for NFC cards

      return new Promise((resolve, reject) => {
        // Handle successful reading
        nfcReader.onreading = (event: any) => {
          const message = event.message.records[0];
          if (message.recordType === "text") {
            const decoder = new TextDecoder();
            resolve(decoder.decode(message.data)); // Decode text data
          } else {
            reject("Invalid NFC data");
          }
        };

        // Handle errors during scanning
        nfcReader.onerror = () => {
          reject("Failed to read NFC card.");
        };
      });
    } catch (err) {
      console.error("Error reading NFC card:", err);
      throw new Error("Error reading NFC card.");
    }
  } else {
    throw new Error("NFC not supported on this browser.");
  }
};