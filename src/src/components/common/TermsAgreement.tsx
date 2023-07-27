/* eslint-disable react/no-unescaped-entities */
import { Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import i18next from '../../config/i18next';

const styles: any = makeStyles(() => ({
    container: {
        padding: '30px',
    },
}));

const TermsAndConditions = () => {
    const initLang = i18next?.language || 'en';
    const css = styles();

    if (initLang === 'fr') {
        return (
            <Grid container className={css.container}>
                <Grid item xs={12}>
                    <Typography>Les Conditions générales gouvernent:</Typography>
                    <ul>
                        <li>l’utilisation de ce site Web, et,</li>
                        <li>tout autre Accord connexe ou relation juridique avec le Propriétaire</li>
                    </ul>
                    <Typography>
                        de façon juridiquement contraignante. Les mots commençant par une majuscule sont définis dans
                        les sections correspondantes de ce document.
                    </Typography>
                    <Typography>L’Utilisateur doit lire ce document attentivement.</Typography>
                    <Typography>L'entité suivante fournit ce site Web:</Typography>
                    <Typography>Reelcruit</Typography>
                    <Typography>67 rue des renards st jean sur richelieu J2W 1P6</Typography>
                    <Typography>
                        <strong>Courriel de contact du Propriétaire:</strong> info@reelcruit.com
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <h4>L’essentiel de ce que les Utilisateurs doivent savoir en un coup d’œil</h4>
                    <Typography>
                        *Ce site Web utilise un renouvellement automatique pour les abonnements au Produit. Plus
                        d’information concernant a) la période de renouvellement, b) les détails de résilitation peuvent
                        être trouvés sans la section correspondante de ces Conditions générales.
                    </Typography>
                    <ul>
                        <li>
                            Veuillez noter que certaines dispositions de ces Conditions générales pourraient ne
                            s’appliquer qu’à certaines catégories d’Utilisateurs. En particulier, certaines des
                            dispositions peuvent ne s’appliquer qu’aux Consommateurs ou aux Utilisateurs qui ne sont pas
                            qualifiés de Consommateurs. De telles limites sont toujours mentionnées expressément dans
                            chaque clause affectée. En l’absence de telle mention, les clauses s’appliquent à tous les
                            Utilisateurs.
                        </li>
                    </ul>
                </Grid>
                <hr />
                <Grid item xs={12}>
                    <Typography>
                        A moins que précisé autrement, les conditions d’utilisation détaillées dans cette section
                        s’appliquent généralement pendant l’utilisation de ce site Web.
                    </Typography>
                    <Typography>
                        Des conditions d’utilisation uniques ou additionnelles peuvent s’appliquer à des contextes
                        particuliers et sont alors indiqués additionnellement au sein de ce document.
                    </Typography>
                    <Typography>
                        En utilisant ce site Web, les Utilisateurs s’engagent à respecter les conditions suivantes :
                    </Typography>
                    <ul>
                        <li>
                            Il n’y a pas de restrictions pour les Utilisateurs en termes de leur statut de Consommateur
                            ou d’Utilisateurs Professionnels.
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={12}>
                    <h4>Création d’un compte</h4>
                    <Typography>
                        Afin d’utiliser le Service, les Utilisateurs doivent s’inscrire ou créer un compte Utilisateur
                        en communiquant toutes les données ou informations nécessaires de manière complète et honnête.
                    </Typography>
                    <Typography>Si les Utilisateurs ne procèdent pas ainsi, le Service sera indisponible.</Typography>
                    <Typography>
                        Les Utilisateurs sont tenus de garder leurs identifiants de connexion confidentiels et de
                        garantir leur sécurité. C’est la raison pour laquelle les Utilisateurs sont également tenus de
                        choisir des mots de passe qui respectent les normes de résistance les plus élevées autorisées
                        par ce site Web.
                    </Typography>
                    <Typography>
                        En s’enregistrant, les Utilisateurs se reconnaissent pleinement responsables pour toutes les
                        activités qui ont lieu sous leurs noms d’utilisateur et mot de passe. Il est requis des
                        Utilisateurs d’informer le Propriétaire immédiatement et sans équivoque, en se servant des
                        coordonnées indiquées dans ce document, s’ils ont raison de penser que leurs informations
                        personnelles, et notamment les comptes d’utilisateurs, les autorisations d’accès ou les données
                        personnelles, ont été violés, indûment divulgués ou volés.
                    </Typography>
                    <h4>Fermeture du compte</h4>
                    <Typography>
                        Les Utilisateurs peuvent fermer leur compte et arrêter d’utiliser le Service à tout moment en:
                    </Typography>
                    <ul>
                        <li>
                            En contactant directement le Propriétaire avec les coordonnées fournies dans ce document.
                        </li>
                    </ul>
                    <h4>Suspension et suppression de compte</h4>
                    <Typography>
                        Le Propriétaire se réserve le droit, à sa seule discrétion, de suspendre ou de supprimer à tout
                        moment et sans avis, les comptes d’Utilisateurs considérés inappropriés, en infraction ou en
                        violation de ces Conditions générales.
                    </Typography>
                    <Typography>
                        La suspension ou la suppression de comptes d’Utilisateurs ne permettra pas aux Utilisateurs de
                        faire des demandes d’indemnisation, de dommages et intérêts ou de remboursement.
                    </Typography>
                    <Typography>
                        La suspension ou la suppression de comptes due à des causes imputables à l’Utilisateur ne
                        dispense pas l’Utilisateur de payer tout frais ou prix applicables.
                    </Typography>
                    <h4>Contenu sur ce site Web</h4>
                    <Typography>
                        Sauf indication contraire ou clairement identifiable, tout contenu accessible sur ce site Web
                        appartient au Propriétaire ou à ses concédants de licence, ou est présenté par ceux-ci.
                    </Typography>
                    <Typography>
                        Le Propriétaire s’efforce de s’assurer que le contenu présenté sur ce site Web n’enfreint aucune
                        disposition légale en vigueur ni aucun droit de tiers. Il n’est cependant pas toujours possible
                        de parvenir à ce résultat.
                    </Typography>
                    <Typography>
                        Dans de tels cas, sans préjudice aux prérogatives légales des Utilisateurs pour mettre leurs
                        droits en application, les Utilisateurs sont priés préférablement de signaler toute plainte en
                        se servant des coordonnées fournies dans ce document.
                    </Typography>
                    <h4>Droits concernant le contenu sur ce site Web</h4>
                    <Typography>
                        Le Propriétaire détient et se réserve tous les droits de propriété intellectuelle pour ce
                        contenu.
                    </Typography>
                    <Typography>
                        Par conséquent, les Utilisateurs ne peuvent pas utiliser ce contenu d’une manière qui n’est pas
                        nécessaire ou implicite dans l’usage adéquat du Service.
                    </Typography>
                    <Typography>
                        Particulièrement, mais sans s’y limiter, les Utilisateurs ne peuvent pas copier, télécharger,
                        partager (au-delà des limites avancées ci-dessous), modifier, traduire, transformer, publier,
                        transmettre, vendre, sous-licencier, modifier, transférer/assigner à des tiers ou créer un
                        travail dérivé du contenu accessible sur ce site Web, ou de permettre tout tiers de le faire à
                        travers l’Utilisateur ou leur appareil, même sans que l’Utilisateur en ait connaissance.
                    </Typography>
                    <Typography>
                        Où expressément indiqué sur ce site Web, l’Utilisateur peut télécharger, copier et/ou partager
                        du contenu accessible sur ce site Web, pour un usage uniquement personnel et non-commercial et à
                        condition que les attributions de droits d’auteur et toutes les autres attributions demandées
                        par le Propriétaire sont correctement mises en place.
                    </Typography>
                    <Typography>
                        Toute limitation statutaire applicable, ou exception au droit d’auteur restera intact.
                    </Typography>
                    <h4>Contenu fourni par les Utilisateurs</h4>
                    <Typography>
                        Le Propriétaire permet aux Utilisateurs de télécharger, partager ou fournir leur propre contenu
                        sur ce site Web.
                    </Typography>
                    <Typography>
                        En fournissant du contenu à ce site Web, les Utilisateurs confirment être légalement autorisés
                        de ce faire et qu’aucune disposition statutaire ou qu’aucun droits de tiers ne sont enfreints.
                    </Typography>
                    <h4>Droits concernant le contenu fourni par les Utilisateurs</h4>
                    <Typography>
                        Les Utilisateurs reconnaissent et acceptent qu’en fournissant leur propre contenu sur ce site
                        Web ils accordent au Propriétaire une licence non-exclusive, entièrement libérée et libre de
                        redevance, afin de traiter un tel contenu uniquement pour l’opération et l’entretien de ce site
                        Web, tel que requis contractuellement.
                    </Typography>
                    <Typography>
                        Dans les limites du droit applicable, les Utilisateurs renoncent à tout droit moral en connexion
                        avec le contenu qu’ils fournissent à ce site Web.
                    </Typography>
                    <Typography>
                        Les Utilisateurs reconnaissent, acceptent et confirment que tout contenu qu’ils fournissent à
                        travers ce site Web sera disponible sous réserve des mêmes Conditions générales avancées pour le
                        contenu sur ce site Web.
                    </Typography>
                    <h4>Responsabilité quant au contenu présenté</h4>
                    <Typography>
                        Les Utilisateurs sont seuls responsables du contenu qu’ils téléchargent, publient, partagent ou
                        présentent sur ce site Web. Les Utilisateurs reconnaissent et acceptent que{' '}
                        <strong>le Propriétaire ne filtre ni ne modère ce contenu.</strong>
                    </Typography>
                    <Typography>
                        Toutefois, le Propriétaire se réserve le droit de retirer, de supprimer, de bloquer ou de
                        rectifier ce contenu, selon ce qu’il juge approprié, et, sans avis préalable, de refuser l’accès
                        à l’Utilisateur pour télécharger sur ce site Web :
                    </Typography>
                    <ul>
                        <li>si une plainte est reçue, qui est fondée sur un tel contenu;</li>
                        <li>si une notification d’infraction de droits de propriété intellectuelle est reçue;</li>
                        <li>sur ordre d’une autorité publique ; ou</li>
                        <li>
                            où le Propriétaire prend conscience que le contenu, tout en étant accessible via ce site
                            Web, peut représenter un risque pour les Utilisateurs, les tiers et/ou la disponibilité du
                            Service.
                        </li>
                    </ul>
                    <Typography>
                        Le retrait, la suppression, le blocage ou la rectification du contenu n’habiliteront pas les
                        Utilisateurs ayant fourni un tel contenu ou qui en sont responsables, de réclamer des
                        compensations, dommages et intérêts ou remboursements.
                    </Typography>
                    <Typography>
                        Les Utilisateurs s’engagent à tenir le Propriétaire protégé de toute réclamation revendiquée
                        et/ou dommages soufferts à cause du contenu qu’ils ont fourni au ou fourni à travers ce site
                        Web.
                    </Typography>
                    <h4>Accès aux ressources externes</h4>
                    <Typography>
                        A travers ce site Web les Utilisateurs peuvent avoir accès aux ressources externes fournies par
                        des tiers. Les Utilisateurs reconnaissent et acceptent que le Propriétaire n’a pas de contrôle
                        sur de telles ressources et ne sera pour cela pas responsable pour le contenu et la
                        disponibilité.
                    </Typography>
                    <Typography>
                        Les conditions applicables aux ressources fournies par des tiers, y compris ceux applicables à
                        tout octroi de droits dans le contenu résulte des Conditions générales de tous tiers ou, en leur
                        absence du droit statutaire applicable.
                    </Typography>
                    <h4>Utilisation acceptable</h4>
                    <Typography>
                        Ce site Web et le Service ne peuvent être utilisés que dans le cadre de ce pour lequel ils ont
                        été fournis, sous ces Conditions générales et le Droit applicable.
                    </Typography>
                    <Typography>
                        Les Utilisateurs seront seuls responsables de s’assurer que leur utilisation de ce site Web
                        et/ou du Service n’enfreint aucune loi en vigueur, règlement ou droits de tiers.
                    </Typography>
                    <Typography>
                        C’est pourquoi, le Propriétaire se réserve le droit de prendre toute mesure appropriée pour
                        protéger ses intérêts légitimes, et notamment de refuser l’accès de l’Utilisateur à ce site Web
                        ou le Service, de mettre fin aux contrats, de reporter toute faute commise à travers ce site Web
                        ou le Service aux autorités compétentes – telles que les autorités judiciaires ou
                        administratives - lorsque les Utilisateurs se livrent ou sont soupçonnés de se livrer aux
                        activités suivantes :
                    </Typography>
                    <ul>
                        <li>une violation de lois ou de règlements en vigueur et/ou de ces Conditions générales ;</li>
                        <li>l’atteinte à tout droit de tiers ;</li>
                        <li>une atteinte considérable aux intérêts légitimes du Propriétaire ;</li>
                        <li>une offense au Propriétaire ou à un tiers</li>
                    </ul>
                    <h3>CONDITIONS GÉNÉRALES DE VENTE</h3>
                    <h4>Produits payés</h4>
                    <Typography>
                        Certains Produits fournis sur ce site Web, constituant une partie du Service, sont payants.
                    </Typography>
                    <Typography>
                        Les frais, la durée et les conditions applicables à l’achat de tels Produits sont décrits
                        ci-dessous et dans les sections correspondantes de ce site Web.
                    </Typography>
                    <h4>Description de produit</h4>
                    <Typography>
                        Les prix, les descriptions ou la disponibilité des Produits sont décrits dans les parties
                        respectives de ce site Web et sont susceptibles d’être modifiés sans préavis.
                    </Typography>
                    <Typography>
                        Bien que les Produits sur ce site Web soient présentés avec la plus grande précision technique
                        possible, les représentations sur ce site Web par tout moyen (y compris, selon le cas, les
                        éléments graphiques, les images, les couleurs, les sons) ne sont données qu’à titre indicatif et
                        n’impliquent aucune garantie quant aux caractéristiques du Produit acheté.
                    </Typography>
                    <Typography>
                        Les caractéristiques du Produit choisi seront décrites lors du processus d’achat.
                    </Typography>
                    <h4>Procédure d’achat</h4>
                    <Typography>
                        Toute étape du choix du Produit au placement de la commande forment partie de la procédure
                        d’achat.
                    </Typography>
                    <Typography>La procédure d’achat inclue ces étapes :</Typography>
                    <ul>
                        <li>Les Utilisateurs doivent choisir le Produit désiré et vérifier leur sélection d’achats.</li>
                        <li>
                            Après avoir revu les informations présentées dans la sélection d’achat, les Utilisateurs
                            peuvent placer une commande en la soumettant.
                        </li>
                    </ul>
                    <h4>Passation de commande</h4>
                    <Typography>Lorsque l’Utilisateur passe une commande, ce qui suit s’applique :</Typography>
                    <ul>
                        <li>
                            La passation d’une commande détermine la conclusion d’un contrat et créé pour cela
                            l’obligation pour l’Utilisateur de payer le prix, les taxes et les frais et dépenses
                            possibles, tel que précisé dans la page de commande.
                        </li>
                        <li>
                            Lorsque le Produit acheté requiert une participation active de l’Utilisateur, tel que la
                            fourniture d’informations ou de données personnelles, précisions ou vœux, la soumission de
                            commande créé une obligation pour l’Utilisateur de coopérer en conséquence.
                        </li>
                        <li>
                            Sur soumission de la commande, les Utilisateurs peuvent recevoir un reçu confirmant que
                            l’ordre a été reçu.
                        </li>
                    </ul>
                    <Typography>
                        Toutes notifications liées au processus d’achat décrit seront envoyées à l’adresse mail fournie
                        par l’Utilisateur pour cette raison.
                    </Typography>
                    <h4>Prix</h4>
                    <Typography>
                        Les Utilisateurs sont informés pendant le processus d’achat et avant la soumission de la
                        commande, de tous frais et prix (y compris, si présents, les coûts de livraison) dont ils seront
                        facturés.
                    </Typography>
                    <Typography>Les Prix sont présentés sur ce site Web :</Typography>
                    <ul>
                        <li>
                            soit excluant soit comprenant tous les frais, taxes et prix applicables, selon l’Utilisateur
                            naviguant ;
                        </li>
                    </ul>
                    <h4>Méthodes de paiement</h4>
                    <Typography>
                        L’information lié aux méthodes de paiement acceptées sont rendues accessibles pendant le
                        processus d’achat.
                    </Typography>
                    <Typography>
                        Certaines méthodes de paiement peuvent seulement être accessible sur conditions ou frais
                        additionnel. Dans de tels cas l’information qui y est connecté peut être trouvée dans la section
                        dédiée de ce site Web.
                    </Typography>
                    <Typography>
                        Tous paiements sont traités indépendamment à travers des services de tiers. C’est pourquoi ce
                        site Web ne collecte pas d’information de paiement – tels que les détails de carte de crédit –
                        mais reçoit seulement une notification une fois que le paiement a pu être complété.
                    </Typography>
                    <Typography>
                        Si le paiement à travers les méthodes accessibles échoue ou est refusé par le fournisseur de
                        service de paiement, le Propriétaire ne sera sous aucune obligation de compléter la commande
                        d’achat. Tout prix ou frais résultant d’un paiement échoué ou refusé sera à la charge de
                        l’Utilisateur.
                    </Typography>
                    <h4>Rétention des droits d’utilisation</h4>
                    <Typography>
                        Les Utilisateurs n’acquièrent pas de droits d’utilisation du Produit acheté jusqu’à ce que le
                        prix d’achat total a été reçu par le Propriétaire.
                    </Typography>
                    <h4>Livraison</h4>
                    <h4>Performance des services</h4>
                    <Typography>
                        Le service acheté sera accompli ou rendu accessible dans la période de temps spécifiée sur ce
                        site Web ou tel que communiqué avant la soumission de la commande.
                    </Typography>
                    <h4>Durée du contrat</h4>
                    <h4>Période d’essai</h4>
                    <Typography>
                        Les Utilisateurs ont la possibilité de tester ce site Web ou de sélectionner des Produits
                        pendant une durée d’essai limitée et non-renouvelable, sans frais.
                    </Typography>
                    <Typography>
                        Plus de conditions applicables à la période d’essai, y compris la durée, seront spécifiés sur ce
                        site Web.
                    </Typography>
                    <Typography>
                        La période d’essai sera automatiquement convertie en l’équivalent du Produit payé, à moins que
                        l’Utilisateur n’annule l’achat avant l’expiration de la période d’essai.
                    </Typography>
                    <h4>Abonnements</h4>
                    <Typography>
                        Les abonnements permettent aux Utilisateurs de recevoir un produit de manière continue ou
                        régulière sur une période déterminée.
                    </Typography>
                    <Typography>
                        Les abonnements payants commencent le jour de réception du paiement par le Propriétaire.
                    </Typography>
                    <Typography>
                        Afin de conserver leurs abonnements, les Utilisateurs doivent payer les frais périodiques requis
                        en temps voulu. Dans le cas contraire, le service pourrait être interrompu.
                    </Typography>
                    <h4>Abonnements à durée limitée</h4>
                    <Typography>
                        Les abonnements à durée limitée commencent au jour de la réception du paiement par le
                        Propriétaire et durent pour la période de souscription choisie par l’Utilisateur ou autrement
                        précisé pendant le processus d’achat.
                    </Typography>
                    <Typography>
                        Une fois que la période d’abonnement expire, le Produit ne sera plus accessible, à moins que
                        l’Utilisateur ne renouvelle l’abonnement en payant les frais qui en résultent.
                    </Typography>
                    <Typography>
                        Les abonnements à durée limitée ne peuvent pas être résiliés précocement et s’épuiseront à
                        l’expiration de la période d’abonnement.
                    </Typography>
                    <h4>Renouvelement automatique</h4>
                    <Typography>
                        <strong>
                            Les Abonnements sont automatiquement renouvelées à travers une méthode de paiement que
                            l’Utilisateur choisis pendant l’achat, à moins que l’Utilisateur n’annule l’abonnement dans
                            les échéances pour la résiliation précisées dans la section correspondante de ces Conditions
                            générales et/ou de ce site Web.
                        </strong>
                    </Typography>
                    <Typography>
                        <strong>
                            L’abonnement renouvelé durera pour une période égale à celle de la durée originale.
                        </strong>
                    </Typography>
                    <Typography>
                        <strong>
                            L’Utilisateur recevra un rappel du prochain renouvellement avec raisonnablement d’avance,
                            soulignant la procédure à suivre afin d’annuler le renouvellement automatique.
                        </strong>
                    </Typography>
                    <h4>Résiliation</h4>
                    <Typography>
                        <strong>
                            Les abonnements peuvent être résiliés à tout moment en envoyant une notification claire et
                            univoque au Propriétaire en utilisant les coordonnées fournies dans ce document, ou – si
                            applicable – en utilisant les contrôles correspondants dans ce site Web.
                        </strong>
                    </Typography>
                    <h4>Avis de résiliation</h4>
                    <Typography>
                        <strong>
                            Si l’avis de résiliation est reçu par le Propriétaire avant le renouvellement de
                            l’abonnement, la résiliation prendra effet dès que la période présente est complétée.
                        </strong>
                    </Typography>
                    <h4>Droits d’Utilisateur</h4>
                    <h4>Droit de rétractation</h4>
                    <Typography>
                        A moins que des exceptions s’appliquent, les Utilisateurs seront éligibles pour se retirer du
                        contrat dans la période spécifiée ci-dessous (généralement 14 jours), pour toute raison et sans
                        motivation. Les Utilisateurs peuvent en apprendre plus sur les conditions de rétractation dans
                        cette section.
                    </Typography>
                    <h4>Le droit de rétractation ne s’applique pas à ce site Web</h4>
                    <Typography>
                        Les Utilisateurs reconnaissent et acceptent que le droit de rétractation ne peut pas s’appliquer
                        aux contrats conclus sur ce site Web à cause de la nature de ce qu’elle offre.
                    </Typography>
                    <h4>Responsabilité et indemnisation</h4>
                    <h3>Utilisateurs Australiens</h3>
                    <h4>Limitation de responsabilité</h4>
                    <Typography>
                        Les présentes Conditions ne sauraient exclure, limiter ou modifier toute garantie, condition,
                        tout droit ou recours dont peut bénéficier l’Utilisateur en vertu de la loi de 2010 sur la
                        concurrence et la consommation ou de toute législation similaire d’un État ou d’un territoire,
                        et qui ne peuvent être exclus, limités ou modifiés (droit ne pouvant être exclu). Dans les
                        limites autorisées par la loi, notre responsabilité envers l’Utilisateur, y compris la
                        responsabilité en cas de violation d’un droit non-excluable et la responsabilité non exclue des
                        présentes Conditions d’utilisation, se limite, selon ce que le Propriétaire juge approprié, à
                        une nouvelle exécution des services ou au paiement des coûts pour obtenir ces services une
                        nouvelle fois.
                    </Typography>
                    <h3>Utilisateurs des États-Unis</h3>
                    <h4>Exclusion de garantie</h4>
                    <Typography>
                        Ce site Web est fournie strictement « en l’état » et « selon sa disponibilité ». L’utilisation
                        du Service relève de la responsabilité de l’Utilisateur. Dans les limites autorisées par la loi
                        en vigueur, le Propriétaire exclut expressément toutes conditions, déclarations et garanties,
                        expresses, tacites, légales ou autres, y compris, sans limitation, toute garantie implicite de
                        qualité marchande, d’adéquation à un usage particulier ou de non-violation des droits de tiers.
                        Aucun conseil ni aucune information, qu’ils soient verbaux ou écrits, obtenus par l’Utilisateur
                        du Propriétaire ou par le biais du Service ne créera une garantie qui ne soit pas expressément
                        énoncée dans les présentes.
                    </Typography>
                    <Typography>
                        Nonobstant ce qui précède, le Propriétaire, ses filiales, sociétés affiliées, concédants de
                        licence, directeurs, administrateurs, représentants, partenaires de co-marquage, partenaires,
                        fournisseurs et employés ne garantissent pas que le contenu est exact, fiable ou correcte ; que
                        le Service répondra aux besoins des Utilisateurs ; que le Service sera disponible à un moment ou
                        un endroit donnés, qu’il sera fourni de manière continue ou sécurisée ; que tout défaut ou
                        erreur seront corrigés ; ou que le Service est exempt de virus ou d’autres composants
                        dommageables. Tout contenu téléchargé ou obtenu autrement grâce à l’utilisation du Service est
                        téléchargé aux risques et périls des Utilisateurs, lesquels sont seuls responsables de tout
                        dommage causé à leur système informatique ou appareil mobile ou de la perte de données résultant
                        de ce téléchargement ou de leur utilisation du Service.
                    </Typography>
                    <Typography>
                        Le Propriétaire ne cautionne et ne garantit aucun produit ou service annoncés ou proposés par un
                        tiers grâce au Service ou à tout site Internet ou service accédés par un lien hypertexte et
                        n’assume aucune responsabilité quant à ces produits et services. En outre, le Propriétaire ne
                        prendra part à aucune transaction entre les Utilisateurs et les fournisseurs tiers de produits
                        ou services ni ne surveillera de quelque manière que ce soit ces transactions.
                    </Typography>
                    <Typography>
                        Le Service peut devenir inaccessible ou ne pas fonctionner correctement avec le navigateur
                        Internet, l’appareil mobile ou le système d’exploitation des Utilisateurs. Le Propriétaire ne
                        saurait être tenu pour responsable des dommages supposés ou réels résultant du contenu, du
                        fonctionnement ou de l’utilisation de ce Service.
                    </Typography>
                    <Typography>
                        La loi fédérale, certains États et d’autres juridictions n’autorisent pas l’exclusion et les
                        limitations de certaines garanties implicites. Les exclusions mentionnées ci-dessus peuvent ne
                        pas s’appliquer aux Utilisateurs. Le présent Contrat accorde des droits juridiques spécifiques
                        aux Utilisateurs, lesquels peuvent également bénéficier d’autres droits qui varient selon les
                        États. Les clauses de dégagement de responsabilité et exclusions prévus dans le présent Contrat
                        ne s’appliquent pas dans la mesure interdite par la loi en vigueur.
                    </Typography>
                    <h4>Limitations de responsabilité</h4>
                    <Typography>
                        Dans les limites autorisées par la loi en vigueur, le Propriétaire et ses filiales, sociétés
                        affiliées, directeurs, administrateurs, représentants, partenaires de co-marquage, partenaires,
                        fournisseurs et employés ne peuvent en aucun cas être tenus pour responsables
                    </Typography>
                    <ul>
                        <li>
                            des dommages indirects, punitifs, consécutifs, spéciaux, accessoires ou exemplaires, y
                            compris mais sans s’y limiter, les dommages pour manque à gagner, perte de clientèle,
                            d’utilisation, de données ou d’autres pertes immatérielles découlant de l’utilisation du
                            Service ou de l’incapacité à l’utiliser ; et
                        </li>
                        <li>
                            des dommages, pertes ou préjudices résultant du piratage, de la falsification ou de tout
                            autre accès ou utilisation non autorisés du Service ou du compte de l’Utilisateur ou des
                            informations qui y figurent ;
                        </li>
                        <li>des erreurs, des fautes ou des inexactitudes de contenu ;</li>
                        <li>
                            des blessures ou des dommages matériels, de quelque nature que ce soit, résultant de l’accès
                            ou de l’utilisation du Service par l’Utilisateur ;
                        </li>
                        <li>
                            de tout accès non autorisé aux serveurs sécurisés du Propriétaire, ou de leur utilisation,
                            ou aux informations personnelles qui y sont stockées ;
                        </li>
                        <li>de toute interruption ou cessation de transmission vers ou depuis le Service ;</li>
                        <li>
                            de tout bogue, virus, cheval de Troie ou autre pouvant être transmis au Service ou par son
                            intermédiaire ;
                        </li>
                        <li>
                            de toute erreur ou omission de contenu ou de toute perte ou dommage subis suite à
                            l’utilisation du contenu publié, envoyé par courrier électronique, transmis ou mis à
                            disposition par le Service ; ou
                        </li>
                        <li>
                            la conduite diffamatoire, offensante ou illégale de tout Utilisateur ou tiers. Le
                            Propriétaire ainsi que ses filiales, sociétés affiliées, directeurs, administrateurs,
                            représentants, partenaires de co-marquage, partenaires, fournisseurs et employés ne peuvent
                            en aucun cas être tenus pour responsables des réclamations, procédures, responsabilités,
                            obligations, dommages, pertes ou coûts d’un montant supérieur au montant payé par
                            l’Utilisateur au Propriétaire en vertu des présentes au cours des 12 mois précédents ou
                            pendant la durée du présent Contrat entre le Propriétaire et l’Utilisateur, selon la période
                            la plus courte.
                        </li>
                    </ul>
                    <Typography>
                        La présente partie se rapportant à la limitation de responsabilité s’applique, dans toute la
                        mesure permise par la loi, dans la juridiction applicable, que la responsabilité présumée
                        résulte d’un contrat, d’un délit, d’une négligence, d’une responsabilité stricte ou autre, et
                        ce, même si le Propriétaire a été informé de la possibilité d’un tel dommage.
                    </Typography>
                    <Typography>
                        Certaines juridictions n’autorisant pas l’exclusion ou la limitation des dommages indirects ou
                        accessoires, les limitations ou exclusions mentionnées ci-dessus peuvent ne pas s’appliquer à
                        l’Utilisateur. Les présentes Conditions accordent des droits juridiques spécifiques à
                        l’Utilisateur, lequel peut également bénéficier d’autres droits qui varient selon les
                        juridictions. Les clauses de dégagement, d’exclusion et de limitations de responsabilité prévues
                        dans les présentes Conditions ne s’appliquent pas dans la mesure interdite par la loi en
                        vigueur.
                    </Typography>
                    <h4>Indemnisation</h4>
                    <Typography>
                        L’Utilisateur accepte de couvrir et de dégager le Propriétaire et ses filiales, sociétés
                        affiliées, directeurs, administrateurs, représentants, partenaires de co-marquage, partenaires,
                        fournisseurs et employés de toute responsabilité en cas de réclamation ou demande, dommage,
                        obligation, perte, responsabilité, coût ou dette et dépense, y compris, mais sans s’y limiter,
                        les honoraires et frais juridiques, découlant de
                    </Typography>
                    <ul>
                        <li>
                            l’utilisation du Service et son accès par l’Utilisateur, y compris toutes données ou tout
                            contenu transmis ou reçus par l’Utilisateur ;
                        </li>
                        <li>
                            la violation des présentes conditions par l’Utilisateur, y compris, mais sans s’y limiter,
                            la violation par celui-ci de l’une des déclarations et garanties énoncées dans les présentes
                            Conditions ;
                        </li>
                        <li>
                            la violation de tout droit de tiers par l’Utilisateur, y compris, mais sans s’y limiter,
                            tout droit de confidentialité ou de propriété intellectuelle ;
                        </li>
                        <li>la violation par l’Utilisateur de toute loi, règle ou réglementation ;</li>
                        <li>
                            tout contenu envoyé depuis le compte de l’Utilisateur, y compris l’accès de tiers avec le
                            nom unique, le mot de passe ou toute autre mesure de sécurité de l’Utilisateur, le cas
                            échéant, y compris, mais sans s’y limiter, des informations trompeuses, fausses ou inexactes
                            ;
                        </li>
                        <li>une faute intentionnelle commise par l’Utilisateur ; ou</li>
                        <li>
                            la violation de toute disposition légale par l’Utilisateur ou ses sociétés affiliées,
                            directeurs, administrateurs, représentants, partenaires de co-marquage, partenaires,
                            fournisseurs et employés dans les limites de la loi en vigueur.
                        </li>
                    </ul>
                    <h3>Dispositions communes</h3>
                    <h4>Clause de non-renonciation</h4>
                    <Typography>
                        Le fait que le Propriétaire ne fasse pas valoir un droit ou une disposition dans le cadre des
                        présentes Conditions ne saurait constituer une renonciation à ce droit ou cette disposition.
                        Aucune renonciation ne saurait être considérée comme une renonciation supplémentaire ou continue
                        à la présente condition ou à n’importe quelle autre.
                    </Typography>
                    <h4>Interruption de service</h4>
                    <Typography>
                        Afin d’assurer le meilleur niveau possible, le Propriétaire se réserve le droit d’interrompre le
                        Service pour entretien, ou pour des mises à jour ou tout autre changement, en informant les
                        Utilisateurs correctement.
                    </Typography>
                    <Typography>
                        Dans les limites du Droit, le propriétaire peut aussi décider de suspendre ou de mettre fin au
                        Service tout entier. S’il est mis fin au Service, le Propriétaire coopéra avec les Utilisateurs
                        pour leur permettre de retirer des Données Personnelles ou informations en accord avec le Droit
                        applicable.
                    </Typography>
                    <Typography>
                        De plus, les Service peut ne pas être accessible à cause de raisons en dehors du contrôle
                        raisonnable du Propriétaire, tel que la « force majeure » (ex : les actions de travail, les
                        ruptures des infrastructures ou les pannes de courant etc).
                    </Typography>
                    <h4>Revente de Service</h4>
                    <Typography>
                        Les Utilisateurs ne peuvent pas reproduire, dupliquer, copier, vendre, revendre ou exploiter
                        toute portion de ce site Web et de ces Services sans la permission exprès préalable, accordée
                        soit directement ou à travers un programme de revente légitime.
                    </Typography>
                    <h4>Politique de confidentialité</h4>
                    <Typography>
                        Pour plus d’information sur l’utilisation de leur Données Personnelles, les utilisateurs peuvent
                        se référer à la politique de confidentialité de ce site Web.
                    </Typography>
                    <h4>Droits de propriété intellectuelle</h4>
                    <Typography>
                        Sans préjudice à toute disposition particulière de ces Conditions générales, tous droits
                        d’auteur, tels que les marques, les brevets et les droits de design associés à ce site Web sont
                        la propriété exclusive du Propriétaire ou de ces concédants de licence sont sujets à la
                        protection accordée par les lois applicables ou les traités internationaux liés à la propriété
                        intellectuelle.
                    </Typography>
                    <Typography>
                        Toutes marques commerciales – nominales ou figurative – et toutes autres marques, noms de
                        commerce, marque de mots, illustrations, images, ou logos apparaissant en connexion avec ce site
                        Web sont, et restent, la propriété exclusive du Propriétaire ou de ces concédants de licence et
                        sont sujets à la protection accordée par les lois applicables ou les traités internationaux liés
                        à la propriété intellectuelle.
                    </Typography>
                    <h4>Modifications de ces Conditions générales</h4>
                    <Typography>
                        Le Propriétaire se réserve le droit de modifier ou autrement de rectifier ces Conditions
                        générales à tout moment. Dans de tels cas, le Propriétaire informera correctement l’Utilisateur
                        de ces modifications.
                    </Typography>
                    <Typography>
                        De telles modifications affecteront seulement la relation avec le futur Utilisateur.
                    </Typography>
                    <Typography>
                        L’utilisation continue du Service signifiera l’acceptation par l’Utilisateur des Conditions
                        générales révisées. Si l’Utilisateur ne souhaite pas être lié par ces modifications,
                        ces-derniers doivent arrêter d’utiliser le Service. Un refus d’acceptation des Conditions
                        générales mettra fin à l’Accord.
                    </Typography>
                    <Typography>
                        La version précédente applicable gouvernera la relation avant l’acceptation par l’Utilisateur.
                        L’Utilisateur peut obtenir toute version précédente du Propriétaire.
                    </Typography>
                    <Typography>
                        Si une loi applicable le requiert, le Propriétaire précisera la date à laquelle les Conditions
                        générales modifiées entrent en vigueur.
                    </Typography>
                    <h4>Assignation de contrat</h4>
                    <Typography>
                        Le Propriétaire se réserve le droit de transférer, assigner, disposer par novation, ou
                        sous-contracter tout ou tous droits ou obligations sous ces Conditions générales, en prenant les
                        intérêts légitimes de l’Utilisation en compte.
                    </Typography>
                    <Typography>
                        Les dispositions concernant les changements de ces Conditions seront appliquées en conséquence.
                    </Typography>
                    <Typography>
                        Les Utilisateurs ne peuvent pas assigner ou transférer leurs droits ou obligations sous ces
                        Conditions générales de tout manière, sans l’autorisation écrite du Propriétaire.
                    </Typography>
                    <h4>Contacts</h4>
                    <Typography>
                        Toute communication liée à l’utilisation de ce site Web doit être envoyée utilisant les
                        coordonnées citées dans ce document.
                    </Typography>
                    <h4>Divisabilité</h4>
                    <Typography>
                        Dans le cas où toute provision de ces Conditions générales pourrait être considérée invalide ou
                        inapplicable sous le Droit applicable, l’invalidité ou l’inapplicabilité d’une telle disposition
                        n’affectera pas la validité des dispositions restantes, qui garderont un plein effet.
                    </Typography>
                    <h4>Utilisateurs des États-Unis</h4>
                    <Typography>
                        Toute disposition invalide ou inapplicable sera interprétée, comprise et réformée dans la mesure
                        de ce qui est raisonnablement requis pour le rendre valide, applicable et consistant avec son
                        objectif initial.
                    </Typography>
                    <Typography>
                        Ces Conditions constituent l’Accord entier entre les Utilisateurs et le Propriétaire en ce qui
                        concerne le présent sujet, et dépasse toute autre communication, y compris mais sans se limiter
                        à, tout accord antérieur entre les parties à ce sujet.
                    </Typography>
                    <Typography>
                        Ces Conditions seront mises en application dans la pleine mesure de ce qui est permis par la
                        Loi.
                    </Typography>
                    <h4>Utilisateurs de l’UE</h4>
                    <Typography>
                        Dans le cas où toute disposition de ces Conditions est ou est considérée nulle, invalide ou
                        inapplicable, les parties feront de leur mieux pour trouver, de façon amicable, un accord sur
                        des dispositions valides et applicables substituant ainsi les parties invalides, nulles ou
                        inapplicables.
                    </Typography>
                    <Typography>
                        A défaut de ce-faire, les dispositions nulles, invalides ou inapplicables seront remplacées par
                        les dispositions statutaires applicables, si cela est permis ou affirmé par la loi en vigueur.
                    </Typography>
                    <Typography>
                        Sans préjudice à ce qui précède, la nullité, l’invalidité ou l’impossibilité d’appliquer une
                        disposition particulière de ces Conditions ne rendra pas nul l’entier Accord, à moins que les
                        dispositions divisées ne soient essentielles à l’Accord, ou d’une telle importance que les
                        parties n’auraient pas conclu le contrat si elles avaient su que la disposition n’était pas
                        valide, ou dans le cas où les dispositions restantes se traduiraient en une épreuve inacceptable
                        pour une des parties.
                    </Typography>
                    <h4>Loi applicable</h4>
                    <Typography>
                        Ces Conditions sont gouvernées par le droit de l’endroit où le Propriétaire est basé, tel qu’est
                        décrit dans la section pertinente de ce document, sans tenir compte des principes de conflits de
                        lois.
                    </Typography>
                    <h4>Exception pour les Consommateurs Européens</h4>
                    <Typography>
                        Cependant, indépendamment de ce qui précède, si l’Utilisateur est qualifié de Consommateur
                        Européen et son lieu de résidence habituelle est dans un pays où la Loi permet des niveaux de
                        protection du consommateur plus élevés, ces niveaux de protection plus élevés prévaudront.
                    </Typography>
                    <h4>Lieu de la juridiction compétente</h4>
                    <Typography>
                        La compétence exclusive de trancher toute controverse résultant de, ou connecté à, ces
                        Conditions générales repose sur les juridictions du lieu où le Propriétaire est basé, tel que
                        décrit dans la section pertinente de ce document.
                    </Typography>
                    <h4>Exception pour les Consommateurs Européens</h4>
                    <Typography>
                        Ce qui précède ne s’applique pas aux Utilisateurs qui sont qualifiés de Consommateurs Européens,
                        ni aux Consommateurs basés en Suisse, Norvège ou Islande.
                    </Typography>
                    <h3>Resolution de conflits</h3>
                    <h4>Resolution à l’amiable de différends</h4>
                    <Typography>
                        Les Utilisateurs peuvent porter un conflit au Propriétaire qui tentera de le résoudre à
                        l’amiable.
                    </Typography>
                    <Typography>
                        Tandis que les droits des utilisateurs de prendre une action légale restera toujours intouché,
                        dans le cas où toute controverse concernant l’utilisation de ce site Web ou du Service, les
                        Utilisateurs seront priés de contacter le Propriétaire avec les coordonnées fournies dans ce
                        document.
                    </Typography>
                    <Typography>
                        L’Utilisateur peut soumettre une plainte comprenant un brève descritpion et si applicable, les
                        détails de la commande, l’achat, ou le compte, à l’adresse électronique du Propriétaire précisée
                        dans ce document.
                    </Typography>
                    <Typography>
                        Le Propriétaire traitera la plainte dans délai injustifié et dans les 21 jours après sa
                        réception.
                    </Typography>
                    <h4>Résolution de conflits en ligne pour les Consommateurs</h4>
                    <Typography>
                        La Commission Européenne a établi une plateforme en ligne pour les règlements de conflits
                        alternatifs qui facilite une méthode extrajudiciaires liés à et venant de contrats de ventes et
                        de services en ligne.
                    </Typography>
                    <Typography>
                        C’est pourquoi, tout Consommateur Européen peut utiliser une telle plateforme pour résoudre
                        toute dispute venant de contrats qui ont été conclus en ligne. Cette plateforme est accessible
                        en suivant le lien suivant.
                    </Typography>
                    <h3>Définitions et références légales</h3>
                    <hr />
                    <h4>Ce site Web (ou cette Application)</h4>
                    <Typography>Le bien qui permet la mise à disposition du Service.</Typography>
                    <h4>Accord</h4>
                    <Typography>
                        Toute relation juridiquement contraignante ou relation contractuelle entre le Propriétaire et
                        l’Utilisateur, gouverné par ces Conditions générales.
                    </Typography>
                    <h4>Utilisateur Commercial</h4>
                    <Typography>Tout Utilisateur qui ne se qualifie pas de Consommateur.</Typography>
                    <h4>Européen (ou Europe)</h4>
                    <Typography>
                        S’applique où l’Utilisateur est physiquement présent ou a des bureaux enregistrés dans l’UE,
                        quelque soit leur nationalité.
                    </Typography>
                    <h4>Propriétaire (ou Nous)</h4>
                    <Typography>
                        Indique la ou les personne(s) ou entité légale(s) qui fournit ce site Web et/ou le Service aux
                        Utilisateurs.
                    </Typography>
                    <h4>Product</h4>
                    <Typography>
                        Un bien ou service accessible à l’achat à travers ce site Web, tel que des biens physiques,
                        dossiers digitaux, logiciels, services de réservation etc
                    </Typography>
                    <Typography>
                        La vente de Produits peut faire partie du Service, tel qui défini ci-dessus.
                    </Typography>
                    <h4>Service</h4>
                    <Typography>
                        Le service fourni par ce site Web telle que décrite dans ces Conditions générales et sur ce site
                        Web.
                    </Typography>
                    <h4>Conditions générales</h4>
                    <Typography>
                        Toutes les dispositions applicables à l’utilisation ce site Web et/ou le Service tel que le
                        décrit ce document, y compris tous autres documents ou accords, et tels que mis à jour de temps
                        en temps.
                    </Typography>
                    <h4>Utilisateur (ou Vous)</h4>
                    <Typography>Indique la personne naturelle ou l’entité légale utilisant ce site Web.</Typography>
                    <h4>Consommateur</h4>
                    <Typography>
                        Tout Utilisateur qualifié de personne naturelle qui accède aux biens ou aux services pour une
                        utilisation personnelle, ou plus généralement, agis à des fins autres que celles de leur
                        commerce, leurs affaires, leur métier ou profession.
                    </Typography>
                </Grid>
            </Grid>
        );
    }
    return (
        <Grid container className={css.container}>
            <Typography component="span">These Terms govern</Typography>
            <Grid item xs={12}>
                <ul>
                    <li>the use of this Website, and,</li>
                    <li>any other related Agreement or legal relationship with the Owner</li>
                </ul>
            </Grid>
            <Typography>
                in a legally binding way. Capitalized words are defined in the relevant dedicated section of this
                document.
            </Typography>
            <Typography>The User must read this document carefully.</Typography>
            <Typography>This Website is provided by:</Typography>
            <Typography>Reelcruit</Typography>
            <Typography>9160 Boulevard Leduc Bureau 410</Typography>
            <Typography>Brossard,</Typography>
            <Typography>J4Y 0E3, QC, Canada</Typography>
            <Typography>
                <strong>Owner contact email:</strong> info@reelcruit.com
            </Typography>
            <Grid item xs={12}>
                <h4>What the User should know at a glance</h4>
            </Grid>
            <Grid item xs={12}>
                <ul>
                    <li>
                        This Website uses automatic renewal for Product subscriptions. Information about the a) renewal
                        period, b) termination details and c) termination notice can be found in the relevant section of
                        these Terms.
                    </li>
                    <li>
                        Please note that some provisions in these Terms may only apply to certain categories of Users.
                        In particular, certain provisions may only apply to Consumers or to those Users that do not
                        qualify as Consumers. Such limitations are always explicitly mentioned within each affected
                        clause. In the absence of any such mention, clauses apply to all Users.
                    </li>
                </ul>
            </Grid>
            <Divider />

            <h4>TERMS OF USE</h4>
            <Typography>
                Unless otherwise specified, the terms of use detailed in this section apply generally when using this
                Website.
            </Typography>
            <Typography>
                Single or additional conditions of use or access may apply in specific scenarios and in such cases are
                additionally indicated within this document.
            </Typography>
            <Typography>By using this Website, Users confirm to meet the following requirements:</Typography>
            <Grid item xs={12}>
                <ul>
                    <li>There are no restrictions for Users in terms of being Consumers or Business Users;</li>
                </ul>
            </Grid>
            <Grid item xs={12}>
                <h4>Account registration</h4>
            </Grid>
            <Typography>
                To use the Service Users must register or create a User account, providing all required data or
                information in a complete and truthful manner.
            </Typography>
            <Typography>Failure to do so will cause unavailability of the Service.</Typography>
            <Typography>
                Users are responsible for keeping their login credentials confidential and safe. For this reason, Users
                are also required to choose passwords that meet the highest standards of strength permitted by this
                Website.
            </Typography>
            <Typography>
                By registering, Users agree to be fully responsible for all activities that occur under their username
                and password.
            </Typography>
            <Typography>
                Users are required to immediately and unambiguously inform the Owner via the contact details indicated
                in this document, if they think their personal information, including but not limited to User accounts,
                access credentials or personal data, have been violated, unduly disclosed or stolen.
            </Typography>
            <h5>Account termination</h5>
            <Typography>
                Users can terminate their account and stop using the Service at any time by doing the following:
            </Typography>
            <Grid item xs={12}>
                <ul>
                    <li>By directly contacting the Owner at the contact details provided in this document.</li>
                </ul>
            </Grid>
            <Grid item xs={12}>
                <h5>Account suspension and deletion</h5>
            </Grid>
            <Typography>
                The Owner reserves the right, at its sole discretion, to suspend or delete at any time and without
                notice, User accounts which it deems inappropriate, offensive or in violation of these Terms.
            </Typography>
            <Typography>
                The suspension or deletion of User accounts shall not entitle Users to any claims for compensation,
                damages or reimbursement.
            </Typography>
            <Grid item xs={12}>
                <h4>Content on this Website</h4>
            </Grid>
            <Typography>
                Unless where otherwise specified or clearly recognizable, all content available on this Website is owned
                or provided by the Owner or its licensors.
            </Typography>
            <Typography>
                The Owner undertakes its utmost effort to ensure that the content provided on this Website infringes no
                applicable legal provisions or third-party rights. However, it may not always be possible to achieve
                such a result.
            </Typography>
            <Typography>
                In such cases, without prejudice to any legal prerogatives of Users to enforce their rights, Users are
                kindly asked to preferably report related complaints using the contact details provided in this
                document.
            </Typography>
            <Grid item xs={12}>
                <h5>Rights regarding content on this Website - All rights reserved</h5>
            </Grid>
            <Typography>
                The Owner holds and reserves all intellectual property rights for any such content. Users may not
                therefore use such content in any way that is not necessary or implicit in the proper use of the
                Service.
            </Typography>
            <Typography>
                n particular, but without limitation, Users may not copy, download, share (beyond the limits set forth
                below), modify, translate, transform, publish, transmit, sell, sublicense, edit, transfer/assign to
                third parties or create derivative works from the content available on this Website, nor allow any third
                party to do so through the User or their device, even without the User's knowledge. Where explicitly
                stated on this Website, the User may download, copy and/or share some content available through this
                Website for its sole personal and non-commercial use and provided that the copyright attributions and
                all the other attributions requested by the Owner are correctly implemented.
            </Typography>
            <Typography>
                Any applicable statutory limitation or exception to copyright shall stay unaffected.
            </Typography>
            <Grid item xs={12}>
                <h4>Content provided by Users</h4>
            </Grid>
            <Typography>
                The Owner allows Users to upload, share or provide their own content to this Website.
            </Typography>
            <Typography>
                By providing content to this Website, Users confirm that they are legally allowed to do so and that they
                are not infringing any statutory provisions and/or third-party rights.
            </Typography>
            <Grid item xs={12}>
                <h5>Rights regarding content provided by Users</h5>
            </Grid>
            <Typography>
                Users acknowledge and accept that by providing their own content on this Website they grant the Owner a
                non-exclusive, fully paid-up and royalty-free license to process such content solely for the operation
                and maintenance of this Website as contractually required.
            </Typography>
            <Typography>
                To the extent permitted by applicable law, Users waive any moral rights in connection with content they
                provide to this Website.
            </Typography>
            <Typography>
                Users acknowledge, accept and confirm that all content they provide through this Website is provided
                subject to the same general conditions set forth for content on this Website.
            </Typography>
            <Grid item xs={12}>
                <h5>Liability for provided content</h5>
            </Grid>
            <Typography>
                Users are solely liable for any content they upload, post, share, or provide through this Website. Users
                acknowledge and accept that the Owner does not filter or moderate such content. However, the Owner
                reserves the right to remove, delete, block or rectify such content at its own discretion and to,
                without prior notice, deny the uploading User access to this Website:
            </Typography>
            <Grid item xs={12}>
                <ul>
                    <li>if any complaint based on such content is received;</li>
                    <li>if a notice of infringement of intellectual property rights is received;</li>
                    <li>upon order of a public authority; or</li>
                    <li>
                        where the Owner is made aware that the content, while being accessible via this Website, may
                        represent a risk for Users, third parties and/or the availability of the Service.
                    </li>
                </ul>
            </Grid>
            <Typography>
                The removal, deletion, blocking or rectification of content shall not entitle Users that have provided
                such content or that are liable for it, to any claims for compensation, damages or reimbursement.
            </Typography>
            <Typography>
                Users agree to hold the Owner harmless from and against any claim asserted and/or damage suffered due to
                content they provided to or provided through this Website.
            </Typography>
            <Grid item xs={12}>
                <h4>Access to external resources</h4>
            </Grid>
            <Typography>
                Through this Website Users may have access to external resources provided by third parties. Users
                acknowledge and accept that the Owner has no control over such resources and is therefore not
                responsible for their content and availability.
            </Typography>
            <Typography>
                Conditions applicable to any resources provided by third parties, including those applicable to any
                possible grant of rights in content, result from each such third parties’ terms and conditions or, in
                the absence of those, applicable statutory law.
            </Typography>
            <Grid item xs={12}>
                <h4>Acceptable use</h4>
            </Grid>
            <Typography>
                This Website and the Service may only be used within the scope of what they are provided for, under
                these Terms and applicable law.
            </Typography>
            <Typography>
                Users are solely responsible for making sure that their use of this Website and/or the Service violates
                no applicable law, regulations or third-party rights.
            </Typography>
            <Typography>
                Therefore, the Owner reserves the right to take any appropriate measure to protect its legitimate
                interests including by denying Users access to this Website or the Service, terminating contracts,
                reporting any misconduct performed through this Website or the Service to the competent authorities –
                such as judicial or administrative authorities - whenever Users engage or are suspected to engage in any
                of the following activities:
            </Typography>
            <Grid item xs={12}>
                <ul>
                    <li>violate laws, regulations and/or these Terms;</li>
                    <li>infringe any third-party rights;</li>
                    <li>considerably impair the Owner’s legitimate interests;</li>
                    <li>offend the Owner or any third party.</li>
                </ul>
            </Grid>
            <Grid item xs={12}>
                <h3>TERMS AND CONDITIONS OF SALE</h3>
                <h4>Paid Products</h4>
                <Typography>
                    Some of the Products provided on this Website, as part of the Service, are provided on the basis of
                    payment.
                </Typography>
                <Typography>
                    The fees, duration and conditions applicable to the purchase of such Products are described below
                    and in the dedicated sections of this Website.
                </Typography>
                <h4>Product description</h4>
                <Typography>
                    Prices, descriptions or availability of Products are outlined in the respective sections of this
                    Website and are subject to change without notice.
                </Typography>
                <Typography>
                    While Products on this Website are presented with the greatest accuracy technically possible,
                    representation on this Website through any means (including, as the case may be, graphic material,
                    images, colors, sounds) is for reference only and implies no warranty as to the characteristics of
                    the purchased Product.
                </Typography>
                <Typography>
                    The characteristics of the chosen Product will be outlined during the purchasing process.
                </Typography>
                <h4>Purchasing process</h4>
                <Typography>
                    Any steps taken from choosing a Product to order submission form part of the purchasing process.
                </Typography>
                <Typography>The purchasing process includes these steps:</Typography>
                <ul>
                    <li>Users must choose the desired Product and verify their purchase selection.</li>
                    <li>
                        After having reviewed the information displayed in the purchase selection, Users may place the
                        order by submitting it.
                    </li>
                </ul>
                <h4>Order submission</h4>
                <Typography>When the User submits an order, the following applies:</Typography>
                <ul>
                    <li>
                        The submission of an order determines contract conclusion and therefore creates for the User the
                        obligation to pay the price, taxes and possible further fees and expenses, as specified on the
                        order page.
                    </li>
                    <li>
                        In case the purchased Product requires active input from the User, such as the provision of
                        personal information or data, specifications or special wishes, the order submission creates an
                        obligation for the User to cooperate accordingly.
                    </li>
                    <li>
                        Upon submission of the order, Users will receive a receipt confirming that the order has been
                        received.
                    </li>
                </ul>
                <Typography>
                    All notifications related to the described purchasing process shall be sent to the email address
                    provided by the User for such purposes.
                </Typography>
                <h4>Prices</h4>
                <Typography>
                    Users are informed during the purchasing process and before order submission, about any fees, taxes
                    and costs (including, if any, delivery costs) that they will be charged.
                </Typography>
                <Typography>Prices on this Website are displayed:</Typography>
                <ul>
                    Either exclusive or inclusive of any applicable fees, taxes and costs, depending on the section the
                    User is browsing.
                </ul>
                <h4>Methods of payment</h4>
                <Typography>
                    Information related to accepted payment methods are made available during the purchasing process.
                </Typography>
                <Typography>
                    Some payment methods may only be available subject to additional conditions or fees. In such cases
                    related information can be found in the dedicated section of this Website.
                </Typography>
                <Typography>
                    All payments are independently processed through third-party services. Therefore, this Website does
                    not collect any payment information – such as credit card details – but only receives a notification
                    once the payment has been successfully completed.
                </Typography>
                <Typography>
                    If payment through the available methods fail or is refused by the payment service provider, the
                    Owner shall be under no obligation to fulfil the purchase order. Any possible costs or fees
                    resulting from the failed or refused payment shall be borne by the User.
                </Typography>
                <h4>Retention of usage rights</h4>
                <Typography>
                    Users do not acquire any rights to use the purchased Product until the total purchase price is
                    received by the Owner.
                </Typography>
                <h3>Delivery</h3>
                <h4>Performance of services</h4>
                <Typography>
                    The purchased service shall be performed or made available within the timeframe specified on this
                    Website or as communicated before the order submission.
                </Typography>
                <h3>Contract duration</h3>
                <h4>Trial period</h4>
                <Typography>
                    Users have the option to test this Website or selected Products during a limited and non-renewable
                    trial period, at no cost. Some features or functions of this Website may not be available to Users
                    during the trial period.
                </Typography>
                <Typography>
                    Further conditions applicable to the trial period, including its duration, will be specified on this
                    Website.
                </Typography>
                <Typography>
                    The trial period shall automatically convert into the equivalent paid Product, unless the User
                    cancels the purchase before the trial period expires.
                </Typography>
                <h4>Subscriptions</h4>
                <Typography>
                    Subscriptions allow Users to receive a Product continuously or regularly over a determined period of
                    time.
                </Typography>
                <Typography>Paid subscriptions begin on the day the payment is received by the Owner.</Typography>
                <Typography>
                    In order to maintain subscriptions, Users must pay the required recurring fee in a timely manner.
                    Failure to do so may cause service interruptions.
                </Typography>
                <h4>Fixed-term subscriptions</h4>
                <Typography>
                    Paid fixed-term subscriptions start on the day the payment is received by the Owner and last for the
                    subscription period chosen by the User or otherwise specified during the purchasing process.
                </Typography>
                <Typography>
                    Once the subscription period expires, the Product shall no longer be accessible, unless the User
                    renews the subscription by paying the relevant fee.
                </Typography>
                <Typography>
                    Fixed-term subscriptions may not be terminated prematurely and shall run out upon expiration of the
                    subscription term.
                </Typography>
                <h4>Automatic renewal</h4>
                <Typography>
                    Subscriptions are automatically renewed through the payment method that the User chose during
                    purchase, unless the User cancels the subscription within the deadlines for termination specified in
                    the relevant section of these Terms and/or this Website.
                </Typography>
                <Typography>The renewed subscription will last for a period equal to the original term.</Typography>
                <Typography>
                    The User shall receive a reminder of the upcoming renewal with reasonable advance, outlining the
                    procedure to be followed in order to cancel the automatic renewal.
                </Typography>
                <h4>Termination</h4>
                <Typography>
                    Recurring subscriptions may be terminated at any time by sending a clear and unambiguous termination
                    notice to the Owner using the contact details provided in this document, or — if applicable — by
                    using the corresponding controls inside this Website.
                </Typography>
                <h4>Termination notice</h4>
                <Typography>
                    If the notice of termination is received by the Owner before the subscription renews, the
                    termination shall take effect as soon as the current period is completed.
                </Typography>
                <h3>User rights</h3>
                <h4>Right of withdrawal</h4>
                <Typography>
                    Unless exceptions apply, the User may be eligible to withdraw from the contract within the period
                    specified below (generally 14 days), for any reason and without justification. Users can learn more
                    about the withdrawal conditions within this section.
                </Typography>
                <h4>The right of withdrawal does not apply on this Website</h4>
                <Typography>
                    Users acknowledge and accept that the right of withdrawal does not apply to contracts concluded over
                    this Website due to the nature of its offering.
                </Typography>
                <h2>Liability and indemnification</h2>
                <h3>Australian Users</h3>
                <h4>Limitation of liability</h4>
                <Typography>
                    Nothing in these Terms excludes, restricts or modifies any guarantee, condition, warranty, right or
                    remedy which the User may have under the Competition and Consumer Act 2010 (Cth) or any similar
                    State and Territory legislation and which cannot be excluded, restricted or modified (non-excludable
                    right). To the fullest extent permitted by law, our liability to the User, including liability for a
                    breach of a non-excludable right and liability which is not otherwise excluded under these Terms of
                    Use, is limited, at the Owner’s sole discretion, to the re-performance of the services or the
                    payment of the cost of having the services supplied again.
                </Typography>
                <h3>US Users</h3>
                <h4>Disclaimer of Warranties</h4>
                <Typography>
                    This Website is provided strictly on an “as is” and “as available” basis. Use of the Service is at
                    Users’ own risk. To the maximum extent permitted by applicable law, the Owner expressly disclaims
                    all conditions, representations, and warranties — whether express, implied, statutory or otherwise,
                    including, but not limited to, any implied warranty of merchantability, fitness for a particular
                    purpose, or non-infringement of third-party rights. No advice or information, whether oral or
                    written, obtained by user from owner or through the Service will create any warranty not expressly
                    stated herein.
                </Typography>
                <Typography>
                    Without limiting the foregoing, the Owner, its subsidiaries, affiliates, licensors, officers,
                    directors, agents, co-branders, partners, suppliers and employees do not warrant that the content is
                    accurate, reliable or correct; that the Service will meet Users’ requirements; that the Service will
                    be available at any particular time or location, uninterrupted or secure; that any defects or errors
                    will be corrected; or that the Service is free of viruses or other harmful components. Any content
                    downloaded or otherwise obtained through the use of the Service is downloaded at users own risk and
                    users shall be solely responsible for any damage to Users’ computer system or mobile device or loss
                    of data that results from such download or Users’ use of the Service.
                </Typography>
                <Typography>
                    The Owner does not warrant, endorse, guarantee, or assume responsibility for any product or service
                    advertised or offered by a third party through the Service or any hyperlinked website or service,
                    and the Owner shall not be a party to or in any way monitor any transaction between Users and
                    third-party providers of products or services.
                </Typography>
                <Typography>
                    The Service may become inaccessible or it may not function properly with Users’ web browser, mobile
                    device, and/or operating system. The owner cannot be held liable for any perceived or actual damages
                    arising from Service content, operation, or use of this Service.
                </Typography>
                <Typography>
                    Federal law, some states, and other jurisdictions, do not allow the exclusion and limitations of
                    certain implied warranties. The above exclusions may not apply to Users. This Agreement gives Users
                    specific legal rights, and Users may also have other rights which vary from state to state. The
                    disclaimers and exclusions under this agreement shall not apply to the extent prohibited by
                    applicable law.
                </Typography>
                <h4>Limitations of liability</h4>
                <Typography>
                    To the maximum extent permitted by applicable law, in no event shall the Owner, and its
                    subsidiaries, affiliates, officers, directors, agents, co-branders, partners, suppliers and
                    employees be liable for
                </Typography>
                <ul>
                    <li>
                        any indirect, punitive, incidental, special, consequential or exemplary damages, including
                        without limitation damages for loss of profits, goodwill, use, data or other intangible losses,
                        arising out of or relating to the use of, or inability to use, the Service; and
                    </li>
                    <li>
                        any damage, loss or injury resulting from hacking, tampering or other unauthorized access or use
                        of the Service or User account or the information contained therein;
                    </li>
                    <li>any errors, mistakes, or inaccuracies of content;</li>
                    <li>
                        personal injury or property damage, of any nature whatsoever, resulting from User access to or
                        use of the Service;
                    </li>
                    <li>
                        any unauthorized access to or use of the Owner’s secure servers and/or any and all personal
                        information stored therein;
                    </li>
                    <li>any interruption or cessation of transmission to or from the Service;</li>
                    <li>
                        any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service;
                    </li>
                    <li>
                        any errors or omissions in any content or for any loss or damage incurred as a result of the use
                        of any content posted, emailed, transmitted, or otherwise made available through the Service;
                        and/or
                    </li>
                    <li>
                        the defamatory, offensive, or illegal conduct of any User or third party. In no event shall the
                        Owner, and its subsidiaries, affiliates, officers, directors, agents, co-branders, partners,
                        suppliers and employees be liable for any claims, proceedings, liabilities, obligations,
                        damages, losses or costs in an amount exceeding the amount paid by User to the Owner hereunder
                        in the preceding 12 months, or the period of duration of this agreement between the Owner and
                        User, whichever is shorter.
                    </li>
                </ul>
                <Typography>
                    This limitation of liability section shall apply to the fullest extent permitted by law in the
                    applicable jurisdiction whether the alleged liability is based on contract, tort, negligence, strict
                    liability, or any other basis, even if company has been advised of the possibility of such damage.
                </Typography>
                <Typography>
                    Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages,
                    therefore the above limitations or exclusions may not apply to User. The terms give User specific
                    legal rights, and User may also have other rights which vary from jurisdiction to jurisdiction. The
                    disclaimers, exclusions, and limitations of liability under the terms shall not apply to the extent
                    prohibited by applicable law.
                </Typography>
                <h4>Indemnification</h4>
                <Typography>
                    The User agrees to defend, indemnify and hold the Owner and its subsidiaries, affiliates, officers,
                    directors, agents, co-branders, partners, suppliers and employees harmless from and against any and
                    all claims or demands, damages, obligations, losses, liabilities, costs or debt, and expenses,
                    including, but not limited to, legal fees and expenses, arising from
                </Typography>
                <ul>
                    <li>
                        User’s use of and access to the Service, including any data or content transmitted or received
                        by User;
                    </li>
                    <li>
                        User’s violation of these terms, including, but not limited to, User’s breach of any of the
                        representations and warranties set forth in these terms;
                    </li>
                    <li>
                        User’s violation of any third-party rights, including, but not limited to, any right of privacy
                        or intellectual property rights;
                    </li>
                    <li>User’s violation of any statutory law, rule, or regulation;</li>
                    <li>
                        any content that is submitted from User’s account, including third party access with User’s
                        unique username, password or other security measure, if applicable, including, but not limited
                        to, misleading, false, or inaccurate information;
                    </li>
                    <li>User’s wilful misconduct; or</li>
                    <li>
                        statutory provision by User or its affiliates, officers, directors, agents, co-branders,
                        partners, suppliers and employees to the extent allowed by applicable law.
                    </li>
                </ul>
                <h3>Common provisions</h3>
                <h4>No Waiver</h4>
                <Typography>
                    The Owner’s failure to assert any right or provision under these Terms shall not constitute a waiver
                    of any such right or provision. No waiver shall be considered a further or continuing waiver of such
                    term or any other term.
                </Typography>
                <h4>Service interruption</h4>
                <Typography>
                    To ensure the best possible service level, the Owner reserves the right to interrupt the Service for
                    maintenance, system updates or any other changes, informing the Users appropriately.
                </Typography>
                <Typography>
                    Within the limits of law, the Owner may also decide to suspend or terminate the Service altogether.
                    If the Service is terminated, the Owner will cooperate with Users to enable them to withdraw
                    Personal Data or information in accordance with applicable law.
                </Typography>
                <Typography>
                    Additionally, the Service might not be available due to reasons outside the Owner’s reasonable
                    control, such as “force majeure” (eg. labor actions, infrastructural breakdowns or blackouts etc).
                </Typography>
                <h4>Service reselling</h4>
                <Typography>
                    Users may not reproduce, duplicate, copy, sell, resell or exploit any portion of this Website and of
                    its Service without the Owner’s express prior written permission, granted either directly or through
                    a legitimate reselling programme.
                </Typography>
                <h4>Privacy policy</h4>
                <Typography>
                    To learn more about the use of their Personal Data, Users may refer to the privacy policy of this
                    Website.
                </Typography>
                <h4>Intellectual property rights</h4>
                <Typography>
                    Without prejudice to any more specific provision of these Terms, any intellectual property rights,
                    such as copyrights, trademark rights, patent rights and design rights related to this Website are
                    the exclusive property of the Owner or its licensors and are subject to the protection granted by
                    applicable laws or international treaties relating to intellectual property.
                </Typography>
                <Typography>
                    All trademarks — nominal or figurative — and all other marks, trade names, service marks, word
                    marks, illustrations, images, or logos appearing in connection with this Website are, and remain,
                    the exclusive property of the Owner or its licensors and are subject to the protection granted by
                    applicable laws or international treaties related to intellectual property.
                </Typography>
                <h4>Changes to these Terms</h4>
                <Typography>
                    The Owner reserves the right to amend or otherwise modify these Terms at any time. In such cases,
                    the Owner will appropriately inform the User of these changes.
                </Typography>
                <Typography>Such changes will only affect the relationship with the User for the future.</Typography>
                <Typography>
                    The continued use of the Service will signify the User’s acceptance of the revised Terms. If Users
                    do not wish to be bound by the changes, they must stop using the Service. Failure to accept the
                    revised Terms, may entitle either party to terminate the Agreement.
                </Typography>
                <Typography>
                    The applicable previous version will govern the relationship prior to the User's acceptance. The
                    User can obtain any previous version from the Owner.
                </Typography>
                <Typography>
                    If required by applicable law, the Owner will specify the date by which the modified Terms will
                    enter into force.
                </Typography>
                <h4>Assignment of contract</h4>
                <Typography>
                    The Owner reserves the right to transfer, assign, dispose of by novation, or subcontract any or all
                    rights or obligations under these Terms, taking the User’s legitimate interests into account.
                    Provisions regarding changes of these Terms will apply accordingly.
                </Typography>
                <Typography>
                    Users may not assign or transfer their rights or obligations under these Terms in any way, without
                    the written permission of the Owner.
                </Typography>
                <h4>Contacts</h4>
                <Typography>
                    All communications relating to the use of this Website must be sent using the contact information
                    stated in this document.
                </Typography>
                <h4>Severability</h4>
                <Typography>
                    Should any provision of these Terms be deemed or become invalid or unenforceable under applicable
                    law, the invalidity or unenforceability of such provision shall not affect the validity of the
                    remaining provisions, which shall remain in full force and effect.
                </Typography>
                <h4>US Users</h4>
                <Typography>
                    Any such invalid or unenforceable provision will be interpreted, construed and reformed to the
                    extent reasonably required to render it valid, enforceable and consistent with its original intent.
                    These Terms constitute the entire Agreement between Users and the Owner with respect to the subject
                    matter hereof, and supersede all other communications, including but not limited to all prior
                    agreements, between the parties with respect to such subject matter. These Terms will be enforced to
                    the fullest extent permitted by law.
                </Typography>
                <h4>EU Users</h4>
                <Typography>
                    Should any provision of these Terms be or be deemed void, invalid or unenforceable, the parties
                    shall do their best to find, in an amicable way, an agreement on valid and enforceable provisions
                    thereby substituting the void, invalid or unenforceable parts.
                </Typography>
                <Typography>
                    In case of failure to do so, the void, invalid or unenforceable provisions shall be replaced by the
                    applicable statutory provisions, if so permitted or stated under the applicable law.
                </Typography>
                <Typography>
                    Without prejudice to the above, the nullity, invalidity or the impossibility to enforce a particular
                    provision of these Terms shall not nullify the entire Agreement, unless the severed provisions are
                    essential to the Agreement, or of such importance that the parties would not have entered into the
                    contract if they had known that the provision would not be valid, or in cases where the remaining
                    provisions would translate into an unacceptable hardship on any of the parties.
                </Typography>
                <h4>Governing law</h4>
                <Typography>
                    These Terms are governed by the law of the place where the Owner is based, as disclosed in the
                    relevant section of this document, without regard to conflict of laws principles.
                </Typography>
                <h4>Exception for European Consumers</h4>
                <Typography>
                    However, regardless of the above, if the User qualifies as a European Consumer and has their
                    habitual residence in a country where the law provides for a higher consumer protection standard,
                    such higher standards shall prevail.
                </Typography>
                <h4>Venue of jurisdiction</h4>
                <Typography>
                    The exclusive competence to decide on any controversy resulting from or connected to these Terms
                    lies with the courts of the place where the Owner is based, as displayed in the relevant section of
                    this document.
                </Typography>
                <h4>Exception for European Consumers</h4>
                <Typography>
                    The above does not apply to any Users that qualify as European Consumers, nor to Consumers based in
                    Switzerland, Norway or Iceland.
                </Typography>
                <h3>Dispute resolution</h3>
                <h4>Amicable dispute resolution</h4>
                <Typography>
                    Users may bring any disputes to the Owner who will try to resolve them amicably.
                </Typography>
                <Typography>
                    While Users' right to take legal action shall always remain unaffected, in the event of any
                    controversy regarding the use of this Website or the Service, Users are kindly asked to contact the
                    Owner at the contact details provided in this document.
                </Typography>
                <Typography>
                    The User may submit the complaint including a brief description and if applicable, the details of
                    the related order, purchase, or account, to the Owner’s email address specified in this document.
                </Typography>
                <Typography>
                    The Owner will process the complaint without undue delay and within 21 days of receiving it.
                </Typography>
                <h4>Online dispute resolution for Consumers</h4>
                <Typography>
                    The European Commission has established an online platform for alternative dispute resolutions that
                    facilitates an out-of-court method for solving any dispute related to and stemming from online sale
                    and service contracts.
                </Typography>
                <Typography>
                    As a result, any European Consumer can use such platform for resolving any dispute stemming from
                    contracts which have been entered into online. The platform is available at the following link.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <h3>Definitions and legal references</h3>
                <h4>This Website (or this Application)</h4>
                <Typography>The property that enables the provision of the Service.</Typography>
                <h4>Agreement</h4>
                <Typography>
                    Any legally binding or contractual relationship between the Owner and the User, governed by these
                    Terms.
                </Typography>
                <h4>Business User</h4>
                <Typography>Any User that does not qualify as a Consumer.</Typography>
                <h4>European (or Europe)</h4>
                <Typography>
                    Applies where a User is physically present or has their registered offices within the EU, regardless
                    of nationality.
                </Typography>
                <h4>Owner (or We)</h4>
                <Typography>
                    Indicates the natural person(s) or legal entity that provides this Website and/or the Service to
                    Users.
                </Typography>
                <h4>Product</h4>
                <Typography>
                    A good or service available for purchase through this Website, such as e.g. physical goods, digital
                    files, software, booking services etc.
                </Typography>
                <Typography>The sale of Products may be part of the Service.</Typography>
                <h4>Service</h4>
                <Typography>
                    The service provided by this Website as described in these Terms and on this Website.
                </Typography>
                <h4>Terms</h4>
                <Typography>
                    All provisions applicable to the use of this Website and/or the Service as described in this
                    document, including any other related documents or agreements, and as updated from time to time.
                </Typography>
                <h4>User (or You)</h4>
                <Typography>Indicates any natural person or legal entity using this Website.</Typography>
                <h4>Consumer</h4>
                <Typography>
                    Any User qualifying as a natural person who accesses goods or services for personal use, or more
                    generally, acts for purposes outside their trade, business, craft or profession.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default TermsAndConditions;
