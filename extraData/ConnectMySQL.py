# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html

import pymysql
from GetData import *
from itertools import product


class connectDB:
    def __init__(self):
        self.conn_obj = pymysql.connect(
            host='182.61.5.68',
            port=3306,
            user='core',
            password='comp9323',
            database='apis',
            charset='utf8'
        )

    def insert_data(self, table_name: str, api: API, num):
        cursor = self.conn_obj.cursor()
        db_id = num
        boto3_type = api.type
        service = api.service
        region_name = api.region
        raw_data = json.dumps(api.raw_data, default=str)
        num_of_groups = api.num_of_groups
        contains_tag = api.contains_tag
        num_of_tags_in_groups = json.dumps(api.num_of_tags_in_groups, default=str)
        IpPermissions = json.dumps(api.IpPermissions, default=str)
        CidrBlock = json.dumps(api.CidrBlock, default=str)
        PrivateIpAddress = json.dumps(api.PrivateIpAddress, default=str)
        if self.check_exist(table_name, db_id):
            self.delete_record(table_name, db_id)
        sample = [db_id, boto3_type, service, region_name, raw_data, num_of_groups, contains_tag, num_of_tags_in_groups,
                  IpPermissions, CidrBlock, PrivateIpAddress]
        sql = f"insert into {table_name} (id,type,service,region,rawData,numOfGroups,numOfTags," \
              f"numOfTagsInGroup,IpPermissions,CidrBlock,PrivateIpAddress) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        cursor.execute(sql, sample)
        self.conn_obj.commit()
        cursor.close()

    def check_exist(self, table_name: str, db_id: int):
        cursor = self.conn_obj.cursor()
        sql = f"select * from {table_name} where id = '{db_id}';"
        cursor.execute(sql)
        result = cursor.fetchall()
        cursor.close()
        return result

    def delete_record(self, table_name: str, db_id: int):
        cursor = self.conn_obj.cursor()
        sql = f"delete from {table_name} where id = '{db_id}';"
        cursor.execute(sql)
        self.conn_obj.commit()
        cursor.close()

    def close(self):
        self.conn_obj.close()


if __name__ == '__main__':
    aws_access_key_id = 'AKIA6A4CHOY6AKLDJFIC'
    aws_secret_access_key = "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"
    boto3_service = [("ec2", "vpc"), ("ec2", "security group"), ("ec2", "subnet"), ("ec2", "ec2"), ("s3", "s3"),
                     ("dynamodb", "dynamodb")]
    DB = connectDB()
    num = 1
    for boto3, service in boto3_service:
        if boto3 != 'dynamodb':
            api = API(aws_access_key_id, aws_secret_access_key, boto3, service, 'ap-southeast-2')
        else:
            api = API(aws_access_key_id, aws_secret_access_key, boto3, service, 'us-east-1')
        DB.insert_data('ApiInfo', api, num)
        num += 1
    DB.close()
