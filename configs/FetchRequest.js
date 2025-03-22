 
// import {useState} from 'react';
import {
  API_BASE_URL,
} from '../constants/common';

//console.log("BASE URL", API_BASE_URL) 


const getService = async (url, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'get',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      
    }).then((response) => {
      // console.log(response.data);
      return response.json()
    })

    console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const getServiceAuthorized = async (url,accessToken, port=9001 ) => {
   try {
    // console.log("--", yourAccessTokenHere)
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'get',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      
    }).then((response) => {
      console.log("from token res =======>> ", response.data);
      return response.json()
    })

    console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}


const postService = async (url, payload, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      // console.log("res data", response);
      return response.json()
    })

    // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const postServiceAuthorized = async (url, payload, accessToken, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      // console.log("res data", response);
      return response.json()
    })

    // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const putServiceAuthorized = async (url, payload, accessToken, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'put',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      // console.log("res data", response);
      return response.json()
    })

    // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}
const deleteServiceAuthorized = async (url, payload, accessToken, port=9001) => {
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'delete',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
      
    }).then((response) => {
      // console.log("res data", response);
      return response.json()
    })

    // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    return err;
  }
  
}

const postServiceFormData = async (url, formdata, port=9001) => { 
  console.log(formdata);
  
  try {
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      // headers: {
          //     // Accept: "application/json",
          //     // "Content-Type": "application/json",
      // },
      body: formdata
      
    }).then((response) => {
      // console.log("fd response", response.json());
      return response.json()
    })

   // console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    console.log("ERR", err)
    return err;
  }
  
}
const postServiceFormDataAuthorized = async (url, formdata, accessToken, port=9001) => {
  try {
    // console.log("url",`${API_BASE_URL}${url}`)
      const responseObj = await fetch(`${API_BASE_URL}${url}`,{
      method: 'post',
      headers: {
              // Accept: "multipart/form-data",
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + accessToken
      },
      body: formdata
      
    }).then((response) => {
      // console.log("fd response", response.json());
      return response.json()
    })

    console.log("ResponseObj", responseObj)
    return (
      responseObj
    )
  } catch(err){
    console.log("ERR", err)
    return err;
  }
  
}

export  {getService, postService, postServiceFormData, getServiceAuthorized, postServiceAuthorized, postServiceFormDataAuthorized, putServiceAuthorized, deleteServiceAuthorized};