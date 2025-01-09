import { $ } from '@wdio/globals'


interface ObjElement {
    selector: string;
    description: string;
}
export default class WdioFactoryUtils {


    /**
    * Clicks on an element
    * @param ObjElement an object containing the selector and description of the element
    */
    public async click(ObjElement: ObjElement): Promise<void> {
        const elementSelector = $(ObjElement.selector);
        const elementDescription = ObjElement.description;
        await elementSelector.waitForClickable({timeoutMsg: `Element ${elementDescription} is not clickable before timeout`});
        await elementSelector.click();
    }
}
