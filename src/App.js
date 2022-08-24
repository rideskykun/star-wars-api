import './App.css';
import React, {useEffect, useState} from 'react';
import {Categories} from "./utils/datas";
import {getService} from "./utils/RestService";

function App() {
    //States
    const [category, setCategory] = useState('people')
    const [query, setQuery] = useState('')
    const [pageData, setPageData] = useState([])

    //Hooks
    useEffect(()=>{

        const URL_ENDPOINT = 'https://swapi.dev/api/'
        const fetchPageData = async() => {
            let url = URL_ENDPOINT + category + '/' + query
            const result = await getService(url)

            if(result){
                setPageData(result.results)
            }else{
                setPageData([])
            }
        }

        fetchPageData().then(r => null)


    },[query, category])
    
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
                <div>
                    Search
                    <input type="text" className={'w-full p-1 border rounded-full'}/>
                </div>
                <div>
                    {pageData.length>0?
                        'TEST'
                        :'No Results'
                    }
                </div>
                <div>
                    <table>
                        
                    </table>
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
