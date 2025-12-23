import requests
import json
import time
import threading
import logging

# 设置日志文件
logging.basicConfig(filename="check_version_test.log", level=logging.INFO,
                    format='%(asctime)s - %(message)s')

# 定义全局变量来记录成功和失败的请求数
success_count = 0
failure_count = 0

# 输入 IP 或域名
print("请输入IP或域名：")
domain = input().strip()

# 输入端口
print("请输入端口：")
port = input().strip()

# 请求 URL
url = f"http://{domain}:{port}/update/check_version"

# 请求数据
data = {
    "version": "v1.0",
    "os-arch": "windows-x64"
}

# 锁定成功和失败计数
lock = threading.Lock()

# 发送请求并处理响应
def send_request():
    global success_count, failure_count

    try:
        response = requests.post(url, json=data)
        # 检查响应状态码
        if response.status_code == 200:
            # 如果请求成功，记录日志
            try:
                response_data = response.json()
                logging.info("成功: %s", response_data)
                with lock:
                    success_count += 1
            except ValueError:
                logging.error("响应不是有效的 JSON 格式")
        else:
            # 请求失败，记录错误信息
            try:
                error_data = response.json()
                logging.error("失败: %s", error_data.get("error"))
                with lock:
                    failure_count += 1
            except ValueError:
                logging.error("错误响应格式不是有效的 JSON 格式")
    except requests.RequestException as e:
        logging.error("请求失败: %s", str(e))
        with lock:
            failure_count += 1

def run_test():
    start_time = time.time()
    threads = []

    # 计算 10 秒钟内每秒 300 次请求，总共进行的请求数
    total_requests = 300 * 10

    for _ in range(total_requests):
        # 创建线程发生请求 设置间隔
        thread = threading.Thread(target=send_request)
        threads.append(thread)
        thread.start()

        # 控制请求的速率（每秒 300 次）
        time.sleep(1 / 300)

    # 等待所有线程完成
    for thread in threads:
        thread.join()

    print(f"测试完成！成功请求：{success_count}，失败请求：{failure_count}")

    logging.info("测试完成！成功请求：%d，失败请求：%d", success_count, failure_count)

if __name__ == "__main__":
    run_test()
