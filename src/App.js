import './App.css';
import React, {useState} from 'react';
import {Categories} from "./utils/datas";

function App() {
    //States
    const [category, setCategory] = useState('people')
    const [tempResult, setTempResult] = useState('')

    //Hooks
    //Functions

    return (
        <div className={'p-3'}>
            {/*Header*/}
            <div className={'text-center text-lg font-bold mb-3'}>
                SWAPI
            </div>

            {/*Pick Category*/}
            <div className={'flex w-full'}>
                <div className={'basis-1/5 py-1'}>Category</div>
                <div className={'basis-4/5'}>
                    <select
                        value={category}
                        onChange={e=>setCategory(e.target.value)}
                        className={'w-full p-1 border rounded-full'}>
                        {
                            Categories.map(c => (
                                <option value={c.toLowerCase()}>{c}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            {/*Main Content*/}
            <div>
                Table
                <div>
                    {tempResult.length>0?
                        tempResult
                        :'No Results'
                    }
                </div>
            </div>

            {/*More Details*/}
            <div className={'sm:hidden'}>
                {/*Modal*/}
                Focus Info mobile

            </div>
            <div className={'invisible sm:visible'}>
                {/*Side Panel*/}
                Focus Info desktop
            </div>
        </div>
    );
}

export default App;
