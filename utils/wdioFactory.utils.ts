import { $ } from '@wdio/globals'


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
}
