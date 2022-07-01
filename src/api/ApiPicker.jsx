import React, {useState, useEffect} from 'react';
import { Picker } from "@react-native-picker/picker";
import request from "../api";

const APIPicker = ({url, selectedValue, onValueChange, placeholder, labelmain, itemlabel, itemvalue="id"}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
     useEffect(()=>{
        const getData = async () => {
            try {
              setLoading(true)
              const response = await request({method: 'get', url}); //aqui tengo todas las cuentas y su info, pero yo solo quiero un array con su id y nombre?
              setData(response.data)
              setLoading(false)
            }
            catch (error){
              setLoading(false);
             // setError(data.msg ? data.msg : data.error);
              console.error(error);
              alert(error);
            }
          }
          
        getData();
     }, []);

    return (
        <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        placeholder={placeholder}
        mode = "dropdown"
      >
        <Picker.Item label={labelmain} />
        {!isLoading ? 
          
          (data.map((item,idx)=>{
            return <Picker.Item label={item[itemlabel]} value={item[itemvalue]} key={`data-${idx}`}/>
          }))
          :
          <Picker.Item label="Loading..." />
        }
      </Picker>
    )
}
export default APIPicker;

