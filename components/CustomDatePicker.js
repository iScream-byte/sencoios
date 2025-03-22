import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Pressable } from 'react-native';

import { CalendarDaysIcon, XMarkIcon } from 'react-native-heroicons/outline';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';

const CustomDatePicker = ({ fieldText, value, setValue, check, required, isDob = false, editable = true, futureDate = false, placholder = "", showBorder = true, onPressCross = () => { }, purpose, pastDays = 0 }) => {

    let today = new Date();    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - parseInt(pastDays));
    //console.log('minDate',minDate);
    // const startDates = getFormatedDate(today.setDate(today.getDate()+1), 'YYYY/MM/DD')
    const [open, setOpen] = useState(false);
    // const [date, setDate] = useState();

    function handleOnPress() {
        setOpen((p) => !p)
    }

    function handleChange(propDate) {
        const dateTimeString = JSON.stringify(propDate);
        const [datePart, timePart] = dateTimeString.split("T");
        console.log('ooo1 ',datePart);

        const [year, month, day] = datePart.split("-").map(part => part.replace(/["\\]/g, ""));

        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate);

        //const tempDate = propDate.split("T");

        setValue(formattedDate)
        handleOnPress()
    }


    const checking = (value, check) => {
        if (showBorder && value) {
            return {
                //borderColor:'#4BB543',
                borderWidth: 1
            }
            // return " border-green-500"
        }
        //console.log()
        if (showBorder && check > 1) {
            return {
                // borderColor:'#F21616',
                borderWidth: 1
            }
            // return " border-red-500"
        } else if (!showBorder) {
            // intentionally kept blank
        }

        // return " border-slate-300"
    }

    const isRequired = () => {
        if (required === true) {
            return (
                <Text className="text-red-600">{" "}*</Text>
            )
        }

    }

    const displayDateFormat = () => {
        if (value) {
            //  console.log("Date value", value)
            const tempDate = value.split('/');
            //return `${tempDate[2]}/${tempDate[1]}/${tempDate[0]}`;
            return `${tempDate[0]}`;
        }
        return '';
    };

    // function dateNow(){
    //     const today = new Date();
    //     let dd = today.getDate();
    //     let mm = parseInt(today.getMonth());
    //     let yyyy = today.getFullYear()
    //     mm++;
    //     mm+=""
    //     if (mm.length < 2) 
    //         mm = '0' + mm;
    //     if (dd.length < 2) 
    //         dd = '0' + dd;
    //     // console.log(`todays date ${yyyy}-${mm}-${dd}`)
    //     return `${yyyy}-${mm}-${dd}`
    // }

    // function monthYearChangeHandler(monthYear){
    //     console.log("month year => ", monthYear)
    // }

    return (
        <View className="overflow-visible relative  mb-2">
            {!!fieldText && <View className="top-[-8px] absolute left-4 bg-white" style={{ zIndex: 99999 }}><Text className=" pl-1 text-[#738088] font-semibold text-[13px] " >{fieldText}{isRequired()}</Text></View>}
            <Pressable onPress={() => editable ? setOpen(true) : ''} className={"absolute right-3 top-[15%] pl-2 border-l border-slate-300 z-10"}>
                <CalendarDaysIcon size={25} color={"#666"} />
            </Pressable>
            <Text className=" py-1.5 pt-4 px-2 pl-5 border border-[#CFD9E3] rounded-full relative font-semibold text-[15px] text-[#373E44]" style={{ ...checking(value, check), color: displayDateFormat() ? "#333" : "#999", backgroundColor: editable ? "#fff" : "rgb(241 245 249)", borderColor: '#CFD9E3', borderWidth: 1, borderRadius: 19 }}>{displayDateFormat() ? displayDateFormat() : placholder}</Text>
            {check > 1 && !value && <Text className="absolute text-[#ED2F2F] tracking-widest -bottom-5">{`${fieldText} is mandatory`}</Text>}
            {/* <TouchableOpacity onPress={handleOnPress}>
            </TouchableOpacity> */}
            <DateTimePickerModal
                isVisible={open}
                mode="date"
                onConfirm={handleChange}
                onCancel={handleOnPress}
                // minimumDate={parseInt(pastDays) > 0 ? minDate : new Date(1970, 1, 1)}
                // maximumDate={today}
            />
        </View>
    )


}

export default CustomDatePicker

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop:22
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        width: '94%',
        padding: 0,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#BD3881',

    },

})