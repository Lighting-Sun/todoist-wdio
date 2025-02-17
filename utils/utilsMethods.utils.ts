
import casual from 'casual';
import { error } from 'console';

class UtilsMethods {

    /**
     * Gets a random string
     * @returns string
     */
    public static async getRandomString(): Promise<string> {
        return await casual.short_description;
    }

    /**
     * Gets an array of random strings
     * @param numberOfStrings number
     * @returns string[]
     */
    public static async getArrayOfRandomStrings(numberOfStrings: number): Promise<string[]> {
        const randomStrings: string[] = new Array(numberOfStrings);
        for (let i = 0; i < numberOfStrings; i++) {
            randomStrings[i] = await this.getRandomString();
        }
        return randomStrings;
    }

    public static async arrayToString(arrayOfItems: Array<any>, separator?: string): Promise<string> {
        if (separator){
            return arrayOfItems.join(separator);
        }
        return arrayOfItems.join('');
    }

    /**
     * Checks wether an array is contained within another array
     * @param array array that is suspected to be contained within another array
     * @param targetArray array that may coontain 'array' parameter
     * @returns boolean
     * @throws error if the array types differ
     */
    public static async arrayIsContained (array: Array<any>, targetArray: Array<any> ) : Promise<boolean> {
        if (typeof(array) !== typeof(targetArray)) {
            throw error("Array types are different");
        }
        return array.every(elem => targetArray.includes(elem));
    };

    public static async asyncShift<T>(arr: T[]): Promise<T | undefined> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(arr.shift());
          }, 300);
        });
    };

}export default UtilsMethods;
