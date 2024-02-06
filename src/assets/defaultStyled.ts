import {StyleSheet} from "react-native";

let defaultStyled = StyleSheet.create({
    flex:{
        display:'flex',
    },
    flex_1:{
        flex:1
    },
    fd_row:{
        flexDirection:'row',
    },
    fd_column:{
        flexDirection:'column'
    },
    flex_wrap:{
        flexWrap:'wrap'
    },
    jc_ct:{
        justifyContent:'center'
    },
    jc_bt:{
        justifyContent:'space-between'
    },
    ai_ct:{
        alignItems:'center',
    },
    ai_fs:{
        alignItems:'flex-start',
    },
    ai_fd:{
      alignItems:'flex-end'
    },
    ai_bl:{
        alignItems:'baseline'
    },
    ac_ct:{
        alignContent:'center'
    }
})

export default defaultStyled

