import Vue from "vue";
import "iview/dist/styles/iview.css";

// 注册UI组件
import {
	Layout,
	Header,
	Content,
	Footer,
	Button,
	Row,
	Col,
	Form,
	FormItem,
	Input,
	Checkbox,
	Circle,
	Collapse,
	InputNumber,
	Select,
	Option,
	Page,
	Menu,
	Submenu,
	MenuItem,
	Tooltip,
	Icon,
	Progress,
	Time,
	Panel,
	Scroll,
	DatePicker,
	Slider,
	Notice,
} from "view-design";
// 注册全局方法组件
import { Spin, Modal, Message } from "view-design";
import { Table, Switch } from "iview";

// iview基础模块
const components = {
	ISwitch: Switch,
	Layout: Layout,
	Collapse: Collapse,
	Panel: Panel,
	Header: Header,
	Content: Content,
	Footer: Footer,
	Button: Button,
	Modal: Modal,
	Row: Row,
	ColC: Col,
	Form: Form,
	FormItem: FormItem,
	Input: Input,
	Checkbox: Checkbox,
	CircleC: Circle,
	InputNumber: InputNumber,
	Select: Select,
	Page: Page,
	Menu: Menu,
	Submenu: Submenu,
	MenuItem: MenuItem,
	Tooltip: Tooltip,
	Icon: Icon,
	Progress: Progress,
	Spin: Spin,
	iCircle: Circle,
	Time: Time,
	Scroll: Scroll,
	Slider: Slider,
	Option: Option,
	Table: Table,
	DatePicker: DatePicker,
	Notice,
};
// 循环注册全局组件
Object.keys(components).forEach((key) => {
	Vue.component(key, components[key]);
});

const methods = {
	Modal: Modal,
	Message: Message,
	Notice,
};

Object.keys(methods).forEach((key) => {
	Vue.prototype["$" + key] = methods[key];
});

Vue.prototype.$Spin = {
	show: function () {
		Spin.show({
			render: (h) => {
				return h("div", { class: "spinner" }, [
					h("div", { class: "rect1" }),
					h("div", { class: "rect2" }),
					h("div", { class: "rect3" }),
					h("div", { class: "rect4" }),
					h("div", { class: "rect5" }),
				]);
			},
		});
	},
	hide: Spin.hide,
};
