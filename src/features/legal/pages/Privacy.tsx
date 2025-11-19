export const Privacy = () => {
  return (
    <div className="bg-background-light py-20">
      <div className="container-custom max-w-4xl">
        <h1 className="section-title mb-8">Política de Privacidade</h1>
        <div className="bg-white rounded-2xl shadow-soft p-8 space-y-6 text-neutral-700">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">1. Coleta de Informações</h2>
            <p>Coletamos apenas as informações necessárias para prestar nossos serviços.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">2. Uso das Informações</h2>
            <p>As informações são utilizadas exclusivamente para comunicação e prestação de serviços.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">3. Segurança</h2>
            <p>Implementamos medidas de segurança para proteger seus dados pessoais.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">4. Compartilhamento</h2>
            <p>Não compartilhamos suas informações com terceiros sem seu consentimento.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">5. Seus Direitos</h2>
            <p>Você tem direito a acessar, corrigir ou excluir seus dados pessoais a qualquer momento.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
