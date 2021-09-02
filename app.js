const express = require('express');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ejs = require('ejs');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/submit', (req, res) => {
  console.log(req);
  //run command w/ name here
});

app.get('/', (req, res, next) => {
  let templateData = [];
  let provisionedList = {};

  const stdout = execSync('aws lightsail get-instances');
  //uncomment this and delete the provisionList = {sample data} below at 27
  //provisionedList = JSON.parse(stdout);

  provisionedList = {
    instances: [
      {
        name: 'james_local',
        arn: 'arn:aws:lightsail:us-west-2:707112942371:Instance/0ed495c4-4cf6-4c12-8972-d2c5ee56b461',
        supportCode: '149815696333/i-0c235f7b3ab9bc3ca',
        createdAt: 1630531070.47,
        location: {
          availabilityZone: 'us-west-2b',
          regionName: 'us-west-2',
        },
        resourceType: 'Instance',
        tags: [
          {
            key: 'env',
            value: 'local',
          },
        ],
        blueprintId: 'ubuntu_18_04',
        blueprintName: 'Ubuntu',
        bundleId: 'large_2_0',
        isStaticIp: true,
        privateIpAddress: '172.26.25.44',
        publicIpAddress: '52.11.128.232',
        ipv6Addresses: ['2600:1f14:e96:7c01:c6c7:f884:3820:fd41'],
        ipAddressType: 'dualstack',
        hardware: {
          cpuCount: 2,
          disks: [
            {
              createdAt: 1630531070.47,
              sizeInGb: 160,
              isSystemDisk: true,
              iops: 480,
              path: '/dev/sda1',
              attachedTo: 'james_local',
              attachmentState: 'attached',
            },
          ],
          ramSizeInGb: 8.0,
        },
        networking: {
          monthlyTransfer: {
            gbPerMonthAllocated: 5120,
          },
          ports: [
            {
              fromPort: 22,
              toPort: 22,
              protocol: 'tcp',
              accessFrom: 'Anywhere (0.0.0.0/0 and ::/0)',
              accessType: 'public',
              commonName: '',
              accessDirection: 'inbound',
              cidrs: ['0.0.0.0/0'],
              ipv6Cidrs: ['::/0'],
              cidrListAliases: [],
            },
            {
              fromPort: 443,
              toPort: 443,
              protocol: 'tcp',
              accessFrom: 'Anywhere (0.0.0.0/0 and ::/0)',
              accessType: 'public',
              commonName: '',
              accessDirection: 'inbound',
              cidrs: ['0.0.0.0/0'],
              ipv6Cidrs: ['::/0'],
              cidrListAliases: [],
            },
          ],
        },
        state: {
          code: 16,
          name: 'running',
        },
        username: 'ubuntu',
        sshKeyName: 'JamesLocal',
      },
      {
        name: 'bruno_local',
        arn: 'arn:aws:lightsail:us-west-2:707112942371:Instance/51de4221-7f84-4845-bf60-e100d8e79c63',
        supportCode: '149815696333/i-0603ba77d9fb7c4e0',
        createdAt: 1630531972.908,
        location: {
          availabilityZone: 'us-west-2b',
          regionName: 'us-west-2',
        },
        resourceType: 'Instance',
        tags: [
          {
            key: 'env',
            value: 'local',
          },
        ],
        blueprintId: 'ubuntu_18_04',
        blueprintName: 'Ubuntu',
        bundleId: 'large_2_0',
        isStaticIp: true,
        privateIpAddress: '172.26.25.190',
        publicIpAddress: '44.237.105.157',
        ipv6Addresses: ['2600:1f14:e96:7c01:b502:b89d:d41c:b051'],
        ipAddressType: 'dualstack',
        hardware: {
          cpuCount: 2,
          disks: [
            {
              createdAt: 1630531972.908,
              sizeInGb: 160,
              isSystemDisk: true,
              iops: 480,
              path: '/dev/sda1',
              attachedTo: 'bruno_local',
              attachmentState: 'attached',
            },
          ],
          ramSizeInGb: 8.0,
        },
        networking: {
          monthlyTransfer: {
            gbPerMonthAllocated: 5120,
          },
          ports: [
            {
              fromPort: 22,
              toPort: 22,
              protocol: 'tcp',
              accessFrom: 'Anywhere (0.0.0.0/0 and ::/0)',
              accessType: 'public',
              commonName: '',
              accessDirection: 'inbound',
              cidrs: ['0.0.0.0/0'],
              ipv6Cidrs: ['::/0'],
              cidrListAliases: [],
            },
            {
              fromPort: 443,
              toPort: 443,
              protocol: 'tcp',
              accessFrom: 'Anywhere (0.0.0.0/0 and ::/0)',
              accessType: 'public',
              commonName: '',
              accessDirection: 'inbound',
              cidrs: ['0.0.0.0/0'],
              ipv6Cidrs: ['::/0'],
              cidrListAliases: [],
            },
          ],
        },
        state: {
          code: 16,
          name: 'running',
        },
        username: 'ubuntu',
        sshKeyName: 'JamesLocal',
      },
      {
        name: 'controlplane',
        arn: 'arn:aws:lightsail:us-west-2:707112942371:Instance/577593b8-2417-4336-b9d9-cb229f797456',
        supportCode: '149815696333/i-07b7b389dea2eab3b',
        createdAt: 1630009031.473,
        location: {
          availabilityZone: 'us-west-2a',
          regionName: 'us-west-2',
        },
        resourceType: 'Instance',
        tags: [
          {
            key: 'LocalControl',
          },
        ],
        blueprintId: 'ubuntu_20_04',
        blueprintName: 'Ubuntu',
        bundleId: 'large_2_0',
        isStaticIp: false,
        privateIpAddress: '172.26.4.123',
        publicIpAddress: '34.220.157.44',
        ipv6Addresses: ['2600:1f14:e96:7c00:a604:45f4:297e:d00'],
        ipAddressType: 'dualstack',
        hardware: {
          cpuCount: 2,
          disks: [
            {
              createdAt: 1630009031.473,
              sizeInGb: 160,
              isSystemDisk: true,
              iops: 480,
              path: '/dev/sda1',
              attachedTo: 'controlplane',
              attachmentState: 'attached',
            },
          ],
          ramSizeInGb: 8.0,
        },
        networking: {
          monthlyTransfer: {
            gbPerMonthAllocated: 5120,
          },
          ports: [
            {
              fromPort: 80,
              toPort: 80,
              protocol: 'tcp',
              accessFrom: 'Anywhere (0.0.0.0/0 and ::/0)',
              accessType: 'public',
              commonName: '',
              accessDirection: 'inbound',
              cidrs: ['0.0.0.0/0'],
              ipv6Cidrs: ['::/0'],
              cidrListAliases: [],
            },
            {
              fromPort: 22,
              toPort: 22,
              protocol: 'tcp',
              accessFrom: 'Custom',
              accessType: 'public',
              commonName: '',
              accessDirection: 'inbound',
              cidrs: ['65.127.76.6/32', '68.2.192.72/32'],
              ipv6Cidrs: ['::/0'],
              cidrListAliases: ['lightsail-connect'],
            },
          ],
        },
        state: {
          code: 16,
          name: 'running',
        },
        username: 'ubuntu',
        sshKeyName: 'JamesLocal',
      },
    ],
  };

  provisionedList.instances.forEach((instance) =>
    templateData.push({
      name: instance.name,
      createdAt: instance.createdAt,
      publicIpAddress: instance.publicIpAddress,
      state: instance.state.name,
    })
  );

  res.render(path.join(__dirname, 'public', 'index.ejs'), {
    instances: templateData,
  });
});

app.listen(port);
