/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import { Ansi } from '@ansi-art/tools';
import { Art } from '../src/index.mjs';
import { Path } from '@environment-safe/file';
const should = chai.should();
const ansi = new Ansi();

const basePath = Path.join(
    Path.current,
    'test/fonts'
);

const fooInFigletDoom = `  __               
 / _|              
| |_   ___    ___  
|  _| / _ \\  / _ \\ 
| |  | (_) || (_) |
|_|   \\___/  \\___/ 
                   
                   
`;

describe('module', ()=>{
    describe('AnsiArt', ()=>{
        it('performs an identity', async ()=>{
            should.exist(Art);
            const emoticons = ':)\n:(';
            const art = new Art(emoticons);
            const identity = art.identity({});
            const promise = identity.promise;
            const output = await promise;
            ansi.strip(output).trim().should.equal(emoticons.trim());
        });
        
        it('renders a figlet font', async ()=>{
            should.exist(Art);
            const art = new Art();
            const font = art.font({
                figlet: 'doom',
                path: basePath,
                text: 'foo'
            });
            const promise = font.promise;
            const output = await promise;
            console.log(fooInFigletDoom);
            console.log(output);
            output.should.equal(fooInFigletDoom);
        });
    });
});

