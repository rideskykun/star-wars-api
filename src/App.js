import './App.css';
import React, {Fragment, useEffect, useState} from 'react';
import {Categories} from "./utils/datas";
import {getService} from "./utils/RestService";
import {camelCaseSpace, isURL, urlToParams} from "./utils/utils";
import {Modal} from "./components";


const URL_ENDPOINT = 'https://swapi.dev/api/'
function App() {
    //States
    const [category, setCategory] = useState('people')
    const [page, setPage] = useState('1')
    const [search, setSearch] = useState('')

    const [pageLoading, setPageLoading] = useState(false)
    const [pageData, setPageData] = useState([])
    const [pagination, setPagination] = useState(null)

    const [detail, setDetail] = useState('')
    const [detailData, setDetailData] = useState(null)
    const [detailLoading, setDetailLoading] = useState(false)

    //Hooks
    useEffect(()=>{

        const fetchPageData = async() => {
            setPageLoading(true)
            let url = URL_ENDPOINT + category + '/?' + new URLSearchParams({
                page: page,
                search: search
            })
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
            setPageLoading(false)
        }

        fetchPageData().then(r => null)

    },[page, search, category])

    useEffect(()=>{

        const fetchDetailData = async() => {
            setDetailLoading(true)

            let url = URL_ENDPOINT + detail
            const result = await getService(url)

            if(result){
                setDetailData(result)
            }else{
                setDetailData(null)
            }

            setDetailLoading(false)
        }

        fetchDetailData().then(r => null)

    },[detail])

    //Funcstions


    return (
        <div className={'p-3'}>
            {/*Header*/}
            <div className={'text-center mb-3'}>
                <div className={'text-lg font-bold'}>
                    SWAPI
                </div>
                <div>
                    by Ridzki
                </div>
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
                    <input
                        value={search}
                        onChange={e=>setSearch(e.target.value)}
                        type="text"
                        className={'basis-4/5 w-full p-1 border rounded-full'}
                    />
                </div>
            </div>

            {/*Main Content*/}
            {!pageLoading?
                pageData.length>0?
                    <div className={'py-2 mx-2 border bg-gray-100 rounded'}>
                        <table className={'table-auto w-full bg-gray-100'}>
                            <thead className={'text-left'}>
                            <tr>
                                {Object.entries(pageData[0]).map((h, index) => {
                                    if(h[0]==='created' || h[0]==='edited' || h[0]==='url' || Array.isArray(h[1])) return null
                                    else if(index!==0) return <th className={'hidden md:table-cell'}>{camelCaseSpace(h[0])}</th>
                                    else return <th>{camelCaseSpace(h[0])}</th>
                                })}
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pageData.map(p => (
                                <tr className={'odd:bg-white even:bg-slate-50 hover:bg-gray-100'}>
                                    {/* eslint-disable-next-line array-callback-return */}
                                    {Object.entries(p).map((v, index) => {
                                        if(v[0]==='created' || v[0]==='edited' || v[0]==='url' || Array.isArray(v[1])) return null
                                        else if(index!==0) return <td className={'hidden md:table-cell py-2'}>
                                            {isURL(v[1])?
                                                (
                                                    <button
                                                        onClick={()=>console.log((v[1]))}
                                                        className={'bg-green-200 text-black py-1 px-3 rounded-full hover:bg-green-300 transition'}>
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
                                            onClick={()=>setDetail(urlToParams(p.url))}
                                            className={'bg-amber-100 text-black py-1 px-2 rounded-full hover:bg-amber-300 transition'}>
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
                                {pagination.count} results | Page {page}
                            </div>
                            <div className={'basis-1/6 md:basis-1/12 flex justify-between'}>
                                <button
                                    onClick={()=>{let url = new URLSearchParams(pagination.previous); setPage(url.get('page'))}}
                                    disabled={!pagination.previous}
                                    className={'bg-gray-300 rounded-full px-3 hover:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-100'}>
                                    &#x2770;
                                </button>
                                <button
                                    onClick={()=>{let url = new URLSearchParams(pagination.next); setPage(url.get('page'))}}
                                    disabled={!pagination.next}
                                    className={'bg-gray-300 rounded-full px-3 hover:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-100'}>
                                    &#x2771;
                                </button>
                            </div>
                        </div>
                    </div>
                    :null
                :
                <div className={'bg-gray-100 h-96 rounded flex justify-center items-center'}>
                    <svg className={'animate-spin h-5 w-5 border border-black'}></svg>
                </div>
            }

            {/*More Details*/}
            <div>
                {/*Modal*/}
                <Modal show={detail} onClose={()=>setDetail('')}>
                    {detailLoading?
                        <div className={'bg-gray-100 h-96 rounded flex justify-center items-center'}>
                            <svg className={'animate-spin h-5 w-5 border border-black'}></svg>
                        </div>
                        :
                        detailData?
                            <div>
                                <table className={'table-auto w-full bg-gray-100 detail-table'}>
                                    <tbody>
                                        {Object.entries(detailData).map(d => {
                                            if(Array.isArray(d[1]) && d[1].length>0){return(
                                                <Fragment>
                                                    <tr className={'odd:bg-white even:bg-slate-50 first:font-bold'}>
                                                        <td rowSpan={d[1].length} className={'border border-gray-300'}>{camelCaseSpace(d[0])}</td>
                                                        <td className={'border border-gray-300'}>
                                                            {isURL(d[1][0])?
                                                                <button
                                                                    onClick={()=>setDetail(urlToParams(d[1][0]))}
                                                                >{d[1][0]}</button>
                                                                :d[1][0]
                                                            }
                                                        </td>
                                                    </tr>
                                                    {d[1].length>1?
                                                        d[1].map((a, index)=>(
                                                            index!==0?
                                                                <tr className={'odd:bg-white even:bg-slate-50 first:font-bold'}>
                                                                    <td className={'border border-gray-300'}>
                                                                        {isURL(a)?
                                                                            <button
                                                                                onClick={()=>setDetail(urlToParams(a))}
                                                                            >{a}</button>
                                                                            :a
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                :null
                                                        ))
                                                        :null
                                                    }
                                                </Fragment>
                                            )}else{return(
                                                <tr className={'odd:bg-white even:bg-slate-50 first:font-bold'}>
                                                    <td className={'border border-gray-300'}>{camelCaseSpace(d[0])}</td>
                                                    <td className={'border border-gray-300'}>
                                                        {isURL(d[1])?
                                                            <button
                                                                onClick={()=>setDetail(urlToParams(d[1]))}
                                                            >{d[1]}</button>
                                                            :d[1]
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div>
                                No Data Found
                            </div>
                    }
                </Modal>
            </div>
        </div>
    );
}

export default App;
