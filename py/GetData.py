# https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html
import boto3
from collections import defaultdict
import json


class API:
    def __init__(self, id, key, botoType, service, region):
        self.id = id
        self.key = key
        self.type = botoType
        self.service = service
        self.region = region
        self.client = boto3.client(
            self.type,
            aws_access_key_id=self.id,
            aws_secret_access_key=self.key,
            region_name=self.region
        )
        if self.service == 'ec2':
            self.raw_data = self.client.describe_instances()
            self.type_id_name = "InstanceId"
        elif self.service == 'subnet':
            self.raw_data = self.client.describe_subnets()
            self.type_id_name = "SubnetId"
        elif self.service == 'vpc':
            self.raw_data = self.client.describe_vpcs()
            self.type_id_name = "VpcId"
        elif self.service == 'security group':
            self.raw_data = self.client.describe_security_groups()
            self.type_id_name = "GroupId"
        elif self.service == 'dynamodb':
            post_ = self.client.describe_table(TableName='posts')
            customer_ = self.client.describe_table(TableName='customer')
            self.raw_data = {'posts': post_, 'customer': customer_}
        elif self.service == 's3':
            self.raw_data = self.client.list_buckets()
        else:
            raise Exception('No such service')
        self.num_of_groups = 0
        self.num_of_tags_in_groups = {}
        self.contains_tag = 0
        self.IpPermissions = defaultdict(list)
        self.CidrBlock = {}
        self.PrivateIpAddress = {}
        if self.type != 'dynamodb':
            self.preSummary()

    def preSummary(self):
        if self.type == 's3':
            buckets = []
            for i in self.raw_data["Buckets"]:
                if "comp9323" in i["Name"]:
                    tag_data = self.client.get_bucket_tagging(Bucket=f"{i['Name']}")
                    buckets.append(tag_data)
            self.raw_data = {"Buckets": buckets}
            for bucket in self.raw_data:
                tag_num = len(bucket['TagSet'])
                if tag_num > 0:
                    self.contains_tag += 1
                    self.num_of_tags_in_groups[self.num_of_groups] = tag_num
                self.num_of_groups += 1
        else:
            key = list(self.raw_data.keys())[0]
            self.num_of_groups = len(self.raw_data[key])
            for group in self.raw_data[key]:
                tags_loc = group.keys() if self.service != 'ec2' else group['Instances'][0].keys()
                if 'Tags' in tags_loc:
                    self.contains_tag += 1
                    if self.service != 'ec2':
                        self.num_of_tags_in_groups[group[self.type_id_name]] = len(group['Tags'])
                    else:
                        self.num_of_tags_in_groups[group['Instances'][0]['InstanceId']] = len(
                            group['Instances'][0]['Tags'])
                if self.service == 'security group':
                    self.getIpPermissions(group)
                elif self.service == 'subnet':
                    self.getCidrBlock(group, 'SubnetId')
                elif self.service == 'vpc':
                    self.getCidrBlock(group, 'VpcId')
                elif self.service == 'ec2':
                    self.getPrivateIpAddress(group)

    def getIpPermissions(self, group):
        if 'IpPermissions' in group.keys():
            for ip in group['IpPermissions']:
                temp = {}
                ip_ranges = []
                if 'IpRanges' in ip.keys():
                    if ip['IpProtocol'] == '-1':
                        continue
                    temp['port'] = (ip['FromPort'], ip['ToPort'])
                    for ip_range in ip['IpRanges']:
                        ip_ranges.append(ip_range['CidrIp'])
                    temp['ip_ranges'] = ip_ranges
                    temp['IpProtocol'] = ip['IpProtocol']
                self.IpPermissions[group['GroupId']].append(temp)

    def getCidrBlock(self, group, id):
        self.CidrBlock[group[id]] = group['CidrBlock']

    def getPrivateIpAddress(self, group):
        if 'Instances' in group.keys():
            for instance in group['Instances']:
                if 'PrivateIpAddress' in instance.keys():
                    self.PrivateIpAddress[instance['InstanceId']] = instance['PrivateIpAddress']


if __name__ == '__main__':
    aws_access_key_id = 'AKIA6A4CHOY6AKLDJFIC'
    aws_secret_access_key = "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"
    boto3_type = 'ec2'
    region_name = 'ap-southeast-2'  # ap-southeast-2 , us-east-1
    api = API(aws_access_key_id, aws_secret_access_key, boto3_type, "vpc", region_name)
    # api.preSummary()
    # print(api.raw_data)
    x = json.dumps(api.raw_data, indent=1, default=str)
    print(x)
    # with open("dynamodb.json", "w+") as f:
    #     json.dump(api.raw_data, f, indent=4, default=str)
