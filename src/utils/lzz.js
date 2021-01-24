/**
 * 空判断
 * @param args
 * @return {boolean}
 */
export const isEmpty = (args) => args === null || args === undefined || args === '';

/**
 * 空对象验证
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
	if (!obj) return true;
	if (typeof obj !== 'object') return true;
	for (let t in obj) return false;
	return true;
};


/**
 * 对象深拷贝
 * @param {Object} obj
 * @returns {null|*}
 */
export const deepCopy = (obj) => {
	if (obj === null) return null;
	let result;
	// 判断是否是简单数据类型
	if (typeof obj === 'object') {
		// 复杂数据类型
		result = obj.constructor === Array ? [] : {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
			}
		}
	} else {
		// 简单数据类型,直接赋值
		result = obj;
	}
	return result;
};

/**
 * 删除对象中值为空的属性（null、undefined、''）
 * @param {Object} obj       参数对象
 * @param {Array<*>} includes  包含值属性，一并删除
 * @returns {object}
 */
export const deleteNullAttr = (obj, includes = []) => {
	const newObj = deepCopy(obj);
	for (const propName in newObj) {
		if (newObj.hasOwnProperty(propName)) {
			if (newObj[propName] && newObj[propName] instanceof Object) {
				const values = Object.values(newObj[propName]);
				const results = values.filter(value => isEmpty(value) || includes.includes(value));
				if (!results.length && includes.length) {
					delete newObj[propName];
				} else {
					deleteNullAttr(newObj[propName], includes);
				}
			} else if (isEmpty(newObj[propName])) {
				delete newObj[propName];
			}
		}
	}
	return newObj;
};