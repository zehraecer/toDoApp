import { qsAll } from "./qs.js"
import { qs } from "./qs.js"


export function bindEventsAll(selector, eventType, cbFunction) {
    const elements = qsAll(selector)

    for (const element of elements) {

        element.addEventListener(eventType, cbFunction)
    }

}

export function bindEvents(selector, eventType, cbFunction) {
    const element = qs(selector)


    element.addEventListener(eventType, cbFunction)

}