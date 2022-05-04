
import { Line } from "vue-chartjs"
export default{
    extends:Line,
    name:"barchart",
    props:{
        Data:{
            type:Object,
            default:null,
        },
        options:{
            type:Object,
            default:null,
        }
    },
    mounted() {
        this.renderChart(this.Data,this.options)
    }
}
