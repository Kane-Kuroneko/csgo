import * as echarts from 'echarts/core'
import {LineChart} from 'echarts/charts'

// 引入提示框，标题，直角坐标系等组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components'
import {LabelLayout, UniversalTransition} from 'echarts/features'
import {SVGRenderer} from 'echarts/renderers'

// 将以上引入的组件使用use()方法注册
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    LineChart,
    SVGRenderer
])

// 导出
export default echarts