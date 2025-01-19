
import { faker } from '@faker-js/faker';

class UtilsMethods {

    /**
     * Gets a random string
     * @returns string
     */
    public getRandomString(): string {
        return faker.lorem.sentence.toString();
    }

    public getArrayOfRandomStrings(numberOfStrings: number): string[] {
        let randomStrings: string[] = new Array(numberOfStrings);
        for (let i = 0; i < numberOfStrings; i++) {
            randomStrings[i] = faker.lorem.sentence.toString();
        }
        return randomStrings;
    }

}export default new UtilsMethods;
