# Inteceptors

Os interceptors em NestJS são usados para interceptar solicitações antes ou depois que elas alcancem os manipuladores de rota e as respostas antes de serem enviadas de volta ao cliente. Eles são muito úteis para adicionar lógica de transformação ou execução de tarefas comuns em toda a aplicação, como logging, tratamento de erros, validação de dados, entre outros.

Os interceptors podem ser usados para modificar a solicitação antes que ela atinja o manipulador de rota, permitindo, por exemplo, a validação de dados de entrada ou a adição de informações ao cabeçalho da solicitação. Da mesma forma, eles podem modificar a resposta antes que ela seja enviada de volta ao cliente, permitindo, por exemplo, formatar a resposta ou adicionar informações adicionais ao corpo da resposta.