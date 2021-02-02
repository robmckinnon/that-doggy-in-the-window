// @ts-check

/**
 * Return URL of random picture of given breed
 * @param {string} breed
 * @returns {string} image URL or null
 */
export const randomPicture = async (breed) => {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const {message, status} = await response.json();
    if (status == 'success') {
      return message;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
