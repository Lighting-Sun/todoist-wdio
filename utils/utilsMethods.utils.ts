
import casual from 'casual';

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

}export default UtilsMethods;
