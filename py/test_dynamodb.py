import boto3
import json
from botocore.client import Config

aws_access_key_id = 'AKIA6A4CHOY6AKLDJFIC'
aws_secret_access_key = "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"
boto3_type = 'dynamodb'

region_name = 'ap-southeast-2'
config = Config(connect_timeout=50, retries={'max_attempts': 0})
client = boto3.client(
    boto3_type,
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name,
    config=config
)

raw_data = client.describe_table(TableName='customer')

# print(raw_data)

print(json.dumps(raw_data, indent=1, default=str))
with open("dynamodb_customer.json", "w+") as f:
        json.dump(raw_data, f, indent=4, default=str)
