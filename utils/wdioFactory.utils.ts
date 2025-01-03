import { $ } from '@wdio/globals'


export default class WdioFactoryUtils {



    public async click(ObjElement: {selector: string, description: string}): Promise<void> {
        const elementSelector = $(ObjElement.selector);
        const elementDescription = ObjElement.description;
        await elementSelector.waitForClickable({timeoutMsg: `Element ${elementDescription} is not clickable before timeout`});
        await elementSelector.click();
    }
}
