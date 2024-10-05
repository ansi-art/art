/*
import { isBrowser, isJsDom } from 'browser-or-node';
import * as mod from 'module';
import * as path from 'path';
let internalRequire = null;
if(typeof require !== 'undefined') internalRequire = require;
const ensureRequire = ()=> (!internalRequire) && (internalRequire = mod.createRequire(import.meta.url));
//*/

import { Context } from '@ansi-art/async-context';
import { Grid } from '@ansi-art/tools';
import { FigletFont } from '@ansi-art/font';
import { sync as kitchenSync } from 'kitchen-sync';

const fonts = {};

let baseDir = process.cwd();
export const setBaseDirectory = (dir)=>{
    baseDir = dir;
};

const createAsciiContext = (startState, bitDepth=4)=>{
    // An AnsiColorContext at the appropriate bit depth
    //const acc = new Ansi(new Color(bitDepth));
    // function to convert values to their corresponding codes
    //const code = (theCode)=> ansi.codeRender([theCode]);
    // this is the context where the current state of the output is stored
    // as we step down the render pipeline
    const textBuffer = new Grid(startState, {bitDepth});
    let asciiPrototype = {
        // chain operations
        identity : (item, cb)=>{ 
            const callback = kitchenSync(cb);
            setTimeout(()=>{ callback(null, textBuffer.toString()); }, 100);
            return callback.return;
        },
        font : (item, cb)=>{
            const callback = kitchenSync(cb);
            const caselessName = item.figlet.toLowerCase();
            try{
                if(!fonts[caselessName]){
                    const font = new FigletFont(item.figlet, item.path);
                    fonts[caselessName] = font;
                    font.loaded.then(()=>{
                        const letters = fonts[caselessName].write(item.text);
                        setTimeout(()=>{
                            callback(null, letters);
                        });
                    });
                }else{
                    const letters = fonts[caselessName].write(item.text);
                    setTimeout(()=>{
                        callback(null, letters);
                    });
                }
            }catch(ex){
                callback(ex);
            }
            return callback.return;
        }
    };
    return asciiPrototype;
};
//const AnsiArt = Context.wrap(createAsciiContext());
//export AnsiArt;

const Art = function(startState='', bitDepth=4){
    return Context.wrap(createAsciiContext(startState));
};

Art.loadFigletDirectory = async (path)=>{
    
};

Art.loadFigletFont = async (name, path=baseDir)=>{
    const caselessName = name.toLowerCase();
    if(!fonts[caselessName]){
        const font = new FigletFont(name, path);
        await font.ready;
    }
};
export { Art };
 
