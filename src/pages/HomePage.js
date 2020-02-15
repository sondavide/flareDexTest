import React from 'react';
import {Main, Grid, Box, DataTable, Text, Button, Menu} from 'grommet';
import {FormUp, FormDown} from 'grommet-icons';
import { PagingTable } from 'grommet-controls';
import actions from '../redux/actions/homepage';
import Spinner from '../component/Spinner';
import { useDispatch,useSelector } from "react-redux";
const axios = require('axios')

export const HomePage=(props)=>{
    const loading =  useSelector(state=>state.loading);
    const grid = useSelector(state=>state.grid);
    const ascend = useSelector(state=>state.ascend);
    const key=useSelector(state=>state.key);
    const url=useSelector(state=>state.url);
    const dispatch = useDispatch();

    const getGridByLink = (link)=>{
        axios.default.get(link)
            .then(function(response){
                dispatch(actions.updateGridSuccess(response.data));
                console.log(response)
            })
            .catch(function(error){
                dispatch(actions.updateGridError(error))
            })


    };

    const getDescriptors = ()=>{

            let colDescriptors=[];
            let firstColumn= {
                property: 'address',
                header: <Text style={{height:"25px"}}>address</Text>,
                primary: true,
            }
            colDescriptors[0]=firstColumn;

            let secondColumn={
                header: <><Text onClick={()=>{dispatch(actions.changeSort());}} >{key} {ascend? <FormDown />: <FormUp/>}</Text></>,
            };
            secondColumn.property=key;
            colDescriptors[1]=secondColumn;

            return colDescriptors



    }

    return(
        <Grid
            fill={'horizontal'}
            rows={['15vh', '85vh']}
            columns={['15vw', 'auto']}
            gap="small"
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'nav', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
        >

            <Box gridArea="header" background="brand" >
                <Text
                    style={{height:'100%', margin:"auto", padding:"20px"}}
                >
                    FlareDex!
                </Text>
            </Box>
            <Box gridArea="nav" background="light-5">
                <Menu
                    style={{margin:'10px'}}
                    label="Menu"
                    items={[
                        { label: 'Amount', onClick: () => {
                                dispatch(actions.getGridByLink('amount','https://api.deversifi.com/v1/pub/tokenRanking/ETH'));
                                getGridByLink('https://api.deversifi.com/v1/pub/tokenRanking/ETH')
                            }
                        },
                        { label: 'USDValue', onClick: () => {
                                dispatch(actions.getGridByLink('USDValue','https://api.deversifi.com/v1/pub/USDRanking'))
                                getGridByLink('https://api.deversifi.com/v1/pub/USDRanking')
                            }
                        },
                    ]}
                />
                {key && url &&
                    <Button
                        style={{margin:'5px'}}
                        label="Update"
                        onClick={() => {
                            dispatch(actions.getGridByLink(key,url))
                            getGridByLink(url)
                        }}
                    />
                }
            </Box>
            <Box gridArea="main" background="light-2"  fill={true} overflow={{ horizontal: "auto" }}>
                {loading===true &&
                    <Spinner/>
                }
                <DataTable
                    showPagination={false}
                    defaultPageSize={1000}
                    fill={'true'}
                    alignSelf={'center'}
                    align={'center'}
                    alignConent={'stretch'}
                    defaultSorted={[{id:"amount",desc:{ascend}}]}
                    columns={getDescriptors()}
                    data={grid}
                />
            </Box>
        </Grid>
    )
}
