import boto3
import json
from botocore.client import Config

aws_access_key_id = 'AKIA6A4CHOY6AKLDJFIC'
aws_secret_access_key = "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"
boto3_type = 's3'

region_name = 'ap-southeast-2'
config = Config(connect_timeout=50, retries={'max_attempts': 0})
client = boto3.client(
    boto3_type,
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name,
    config=config
)
buckets = []
raw_data = client.list_buckets()
for i in raw_data["Buckets"]:
    if "comp9323" in i["Name"]:
        tag_data = client.get_bucket_tagging(Bucket=f"{i['Name']}")
        buckets.append(tag_data)
result = {"Buckets": buckets}
# print(json.dumps(raw_data, indent=1, default=str))
with open("s3.json", "w+") as f:
    json.dump(result, f, indent=4, default=str)

with open("s3_raw_data.json", "w+") as f:
json.dump(raw_data, f, indent=4, default=str)
