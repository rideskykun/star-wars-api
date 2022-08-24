import './App.css';
import React, {useEffect, useState} from 'react';
import {Categories} from "./utils/datas";
import {getService} from "./utils/RestService";
import {camelCaseSpace, getParams, isURL, urlToParams} from "./utils/utils";


const URL_ENDPOINT = 'https://swapi.dev/api/'
function App() {
    //States
    const [category, setCategory] = useState('people')
    const [query, setQuery] = useState('')
    const [pageData, setPageData] = useState([])
    const [pagination, setPagination] = useState(null)
    const [param, setParam] = useState(0)

    //Hooks
    useEffect(()=>{


        const fetchPageData = async() => {
            let url = URL_ENDPOINT + category + '/' + query
            const result = await getService(url)

            if(result){
                setPageData(result.results)
                setPagination({
                    count: result.count,
                    next: result.next,
                    previous: result.previous
                })
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

            <div className={'md:flex md:space-x-10'}>
                {/*Pick Category*/}
                <div className={'flex w-full mb-3'}>
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

                {/*Search*/}
                <div className={'flex w-full mb-3'}>
                    <div className={'basis-1/5 py-1'}>Search</div>
                    <input type="text" className={'basis-4/5 w-full p-1 border rounded-full'}/>
                </div>
            </div>

            {/*Main Content*/}
            <div>
                {pageData.length>0?
                    <div className={'py-2 mx-2 border bg-gray-100 rounded'}>
                        <table className={'table-auto w-full bg-gray-100'}>
                            <thead className={'text-left'}>
                                <tr>
                                    {Object.keys(pageData[0]).map((h, index) => {
                                        if(h==='created' || h==='edited' || h==='url') return null
                                        else if(index!==0) return <th className={'hidden sm:table-cell'}>{camelCaseSpace(h)}</th>
                                        else return <th>{camelCaseSpace(h)}</th>
                                    })}
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                            {pageData.map(p => (
                                <tr className={'odd:bg-white even:bg-slate-50 hover:bg-gray-100'}>
                                    {/* eslint-disable-next-line array-callback-return */}
                                    {Object.entries(p).map((v, index) => {
                                        if(v[0]==='created' || v[0]==='edited' || v[0]==='url') return null
                                        else if(index!==0) return <td className={'hidden sm:table-cell py-2'}>
                                            {isURL(v[1])?
                                                (
                                                    <button
                                                        className={'bg-green-200 text-black py-1 px-3 rounded-full hover:bg-green-300'}>
                                                        View
                                                    </button>
                                                )
                                                :
                                                (v[1])
                                            }
                                        </td>
                                        else return <td className={'py-2'}>{v[1]}</td>
                                    })}
                                    <td>
                                        <button
                                            className={'bg-amber-100 text-black py-1 px-2 rounded-full hover:bg-amber-300'}>
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/*Pagination*/}
                        <div className={'px-2 pt-2 flex justify-between'}>
                            <div>
                                {pagination.count} results {query?'| Page ' + query[query.length-1]:null}
                            </div>
                            <div className={'basis-1/6 md:basis-1/12 flex justify-between'}>
                                <button
                                    onClick={()=>setQuery(getParams(pagination.previous))}
                                    disabled={!pagination.previous}
                                    className={'bg-gray-300 rounded-full px-3 hover:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-100'}>
                                    &#x2770;
                                </button>
                                <button
                                    onClick={()=>setQuery(getParams(pagination.next))}
                                    disabled={!pagination.next}
                                    className={'bg-gray-300 rounded-full px-3 hover:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-100'}>
                                    &#x2771;
                                </button>
                            </div>
                        </div>
                    </div>
                    :null
                }
            </div>

            {/*More Details*/}
            <div className={'sm:hidden'}>
                {/*Modal*/}
                <div className={'border'}>

                </div>

            </div>
            <div className={'invisible sm:visible'}>
                {/*Side Panel*/}
                Focus Info desktop
            </div>
        </div>
    );
}

export default App;
