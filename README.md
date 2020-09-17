# HAProxyLogsAnalyzer
HA Proxy logs analyzer

## Commands and output for http logs

1. Help
```sh
> node analyzer.js help
Haproxy Log Analyzer.
 Usage: node index.js [from-filename] [from-time(optional)] [to-time(optional)].
 Date Format Example: Sep 14 00:04:14
```

2. Below command shows number of request for each IP address and total number of requests for haproxy log file `2020-09-14.log` 
```sh
> node analyzer.js 2020-09-14.log 
[
  { ip: 'ip_address1', count: 125728 },
  { ip: 'ip_address2', count: 42505 },
  { ip: 'ip_address3', count: 37382 }
]
Total Requests = 205615
```

3. Total number of requests witin a time frame
```sh
> node analyzer.js 2020-09-14.log "Sep 14 00:04:14" "Sep 14 00:10:14"
[
  { ip: 'ip_address1', count: 1042 },
  { ip: 'ip_address2', count: 643 },
  { ip: 'ip_address3', count: 356 },
  { ip: 'ip_address4', count: 331 }
]
Total Requests = 2372
```

