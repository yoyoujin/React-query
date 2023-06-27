# Mutations

- making a network call thant changes data on the server
- 서버에 네트워크 호출을 실시한다 <br>
  (블로그 포스트를 추가하거나, 삭제, 수정)

## useMutation

- Similar to useQuery,
- but: returns mutate function
- 변경 사항을 토대로 서버를 호출할 때 사용한다.
- 데이터를 저장하지 않으므로, 쿼리키는 필요하지 않다.
- isLoading은 존재하지만 isFetching은 없다. (캐시된 항목이 없기 때문에 성립하지 않는다.)
- 디폴트: 재시도도 존재하지 않는다. (useQuery는 기본값으로 3회 재시도함)
