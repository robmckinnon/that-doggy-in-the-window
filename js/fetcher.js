// @ts-check

const apiFetch = async (url) => {
  try {
    const response = await fetch(url);
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

/**
 * Return all breeds and their subbreeds
 * @returns {object} breed keys with arrays of sub-breeds as values
 */
export const listAllBreeds = async () =>
  apiFetch('https://dog.ceo/api/breeds/list/all');

/**
 * Return URL of random picture of given breed
 * @param {string} breed
 * @returns {string} image URL or null
 */
export const randomPicture = async (breed) =>
  apiFetch(`https://dog.ceo/api/breed/${breed}/images/random`);

/**
 * Return URLs of pictures of given breed
 * @param {string} breed
 * @returns {string[]} image URLs or null
 */
export const listByBreed = async (breed) =>
  apiFetch(`https://dog.ceo/api/breed/${breed}/images`);
