import { $, $$ } from '@wdio/globals'



interface ObjElement {
    selector: string;
    description: string;
}
export default class WdioFactoryUtils {


    /**
    * Clicks on an element
    * @param objElement an object containing the selector and description of the element
    */
    public async click(objElement: ObjElement): Promise<void> {
        const elementSelector = $(objElement.selector);
        const elementDescription = objElement.description;
        await elementSelector.waitForClickable({timeoutMsg: `Element ${elementDescription} is not clickable before timeout`});
        await elementSelector.click();
    }


    /**
     * Returns the selector and description of an element by replacing the placeholder ${value} with the value provided
     * @param objElement an object containing the selector and description of the element
     * @param strValue the value to replace the placeholder ${value}
     * @returns an object containing the selector and description of the element of type ObjElement
     */
    public async getSelectorByValue(objElement:ObjElement , strValue: string): Promise<ObjElement> {
        const elementSelector = await objElement.selector.replace('${value}', strValue);
        const elementDescription = await objElement.description.replace('${value}', strValue);
        return {
            selector: elementSelector,
            description: elementDescription
        };
    }


    /**
     * sets the value of an element
     * @param objElement an object containing the selector and description of the element
     * @param srtValueToSend the value to set
     */
    public async setValue(objElement: ObjElement, srtValueToSend: string): Promise<void> {
        const elementSelector = $(objElement.selector);
        const elementDescription = objElement.description;
        await elementSelector.waitForEnabled({timeoutMsg: `Element ${elementDescription} is not enabled before timeout`});
        await this.click(objElement)
        await elementSelector.setValue(srtValueToSend);
    }

    /**
     * sets the value of an element by using the sendKeys method from wdio
     * @param objElement an object containing the selector and description of the element
     * @param srtValueToSend the value to set
     */
        public async setValueByKeys(objElement: ObjElement, srtValueToSend: string): Promise<void> {
            const elementSelector = $(objElement.selector);
            const elementDescription = objElement.description;
            await elementSelector.waitForDisplayed({timeoutMsg: `Element ${elementDescription} is not found before timeout`});
            await elementSelector.waitForEnabled({timeoutMsg: `Element ${elementDescription} is not enabled before timeout`});
            await elementSelector.waitForClickable({timeoutMsg: `Element ${elementDescription} is not clickable before timeout`});
            await this.click(objElement)
            for (const characters of srtValueToSend) {
                await browser.keys(characters);
            }
        }


    /**
     * Returns the text of an element
     * @param objElement an object containing the selector and description of the element
     * @returns the text of the element
     */
    public async getText(objElement: ObjElement): Promise<string> {
        const elementSelector = $(objElement.selector);
        const elementDescription = objElement.description;
        await elementSelector.waitForDisplayed({timeoutMsg: `Element ${elementDescription} is not found before timeout`});
        return await elementSelector.getText();
    }

    /**
     * Returns selectors of elements
     * @param objElements an object containing the selector and description elements
     * @returns an array of selectors
    */
    public async getElements(objElements: ObjElement): Promise<any[]> {
        const elementsSelector: ChainablePromiseArray = $$(objElements.selector);
        return elementsSelector;
    }

    /**
     * Returns the text of elements
     * @param objElements an object containing the selector and description elements
     * @returns an array of texts
     */
    public async getTextFromElements(objElements: ObjElement): Promise<string[]> {
        const elements = await this.getElements(objElements);
        const elementsText: string[] = await Promise.all(await elements.map(async (element) =>  await element.getText()))
        return elementsText;
    }


    /**
     * Clicks on all elements that match the selector
     * @param objElement an object containing the selector and description of the element
     */
    public async clickAllIfExist(objElement: ObjElement): Promise<void> {
        let element = await $(objElement.selector);
        let isClickable = await element.waitForClickable({timeout: 1000}).catch(() => false);

        while(isClickable) {
            await element.click();
            element = await $(objElement.selector);
            isClickable = await element.waitForClickable({timeout: 1000}).catch(() => false);
        }
    }

    /**
     * Hover over an element
     * @param objElement an object containing the selector and description of the element
     * @returns Promise<void>
     */
    public async hover(objElement: ObjElement): Promise<void> {
        const elementSelector = $(objElement.selector);
        const elementDescription = objElement.description;
        await elementSelector.waitForDisplayed({timeoutMsg: `Element ${elementDescription} is not found before timeout`});
        await elementSelector.moveTo();
    }

     /**
     * Hover over an element
     * @param objElement an object containing the selector and description of the element
     * @returns Promise<void>
     */
    public async isHoverable(objElement: ObjElement): Promise<boolean> {
        const elementSelector = $(objElement.selector);
        const elementDescription = objElement.description;
        const elementDisplayed = await elementSelector.waitForDisplayed({timeout: 7000,timeoutMsg: `Element ${elementDescription} is not found before timeout`}).catch(() => false);
        return elementDisplayed;
    }

}
