import { HandlerData } from "../types/handler";

/**
 * isEmitter 判断是否为 event-based 模式
 * 
 * 通过 JSON.stringify 判断是否为 event-based 模式。
 * 原理：在 event-based 模式下, pattern 是不带 cmd 的。
 * 
 * @param pattern 模式
 * @returns boolean
 */
export function isEmitter(pattern: string) {
  try {
    JSON.stringify(pattern)
    return false
  } catch {
    return true
  }
}

/**
 * 解析来自 NestJS Gateway 发布的信息
 * @param message
 * @returns object
 */
export function parseEventDataFromGateway(message: string): {
  id: string;
  data: HandlerData;
  pattern: string;
  isEmitter: boolean;
} {
  const mes = JSON.parse(message)
  return {
    id: mes.id,
    data: mes.data,
    pattern: JSON.stringify(mes.pattern),
    isEmitter: isEmitter(mes.pattern),
  }
}

/**
 * 生成发送至 NestJS Gateway 的信息
 * @param id 事件ID
 * @param data 事件数据
 * @param pattern 模式
 * @param isEmitter 是否为 event-based 模式
 */

export function generateEventDataToGateway(
  id: string,
  data: string | object,
  pattern: string,
  isEmitter: boolean
) {
  return JSON.stringify({
    id,
    data,
    pattern: isEmitter ? pattern : JSON.parse(pattern),
    isEmitter,
  })
}

/**
 * 快捷生成模式
 * @param pattern 活动名称
 * @param isEmit 是否为 event-based 模式
 * @returns string
 */
export function generatePattern(pattern: string, isEmit?: boolean) {
  if (!isEmit) {
    return JSON.stringify({ cmd: pattern })
  }
  return pattern
}

/**
 * 生成响应数据
 * @param id 事件ID
 * @param data 事件数据
 * @returns string
 */
export function generateResponse(id: string, data: string | object) {
  return JSON.stringify(
    {
      response: data,
      isDisposed: true,
      id,
    }
  )
}