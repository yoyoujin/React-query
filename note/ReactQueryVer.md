# React Query 버전3 및 버전4 비교

### 버전3 install

```
npm install react-query@^3
```

### 버전3 vs. 버전4 차이점

1. v4에서 설치 및 가져오기를 수행하려면 react-query 대신 @tanstack/react-query 를 권장합니다.

2. 쿼리 키는 배열이어야 합니다. 그러니 과정에서 쿼리 키 배열 대신 문자열을 사용하는 경우 배열로 묶어야 합니다.

3. 개발자 도구를 별도로 설치하고 '@tanstack/react-query-devtools'에서 가져와야 합니다.

4. setLogger (테스트 섹션에서 사용)가 제거되었습니다. 대신 QueryClient 옵션으로 로거를 추가해야 합니다.

5. 이제 setQueryData에서 onSuccess가 호출되지 않습니다. 이로 인해 과정을 게시한 후에 다른 방향으로 동작이 변경되자(이전에는 그렇지 않았으나 setQueryData 이후에 onSuccess를 호출하기 시작함) 혼란이 생겼고 결국 이 변경 사항을 고려하도록 과정을 업데이트했습니다. React Query 버전 4에서 가장 조정하기 어려운 문제에 속할 텐데, 주로 이 점 때문에 과정을 버전 4로 공식 업데이트하기 전까지는 React Query 버전 3를 계속 사용할 것을 권고합니다.
