## isFetching vs. isLoading

### isFetching

- 비동기 쿼리가 해결되지 않았음을 의미 (아직 데이터를 가져오는 중)
- Fetching을 완료하지 않았다는 의미
- isFetching을 사용하면 prefetching 전에 행동함

### isLoading

- isFetching의 하위집합
- 상태에 있음을 의미
- 캐시된 데이터가 없고, 데이터를 가져오는 상황에 해당
