import { get, isNil, toArray } from 'lodash'

import { DEPENDENCIES } from '../../../utils/constants'
import { API_URL } from '../../../../config/vars'

export const syncUsers = () => {
  console.log('syncUsers')
}

export const checkDwollaWebhookSubscription = async (
  container: any
): Promise<void> => {
  const dwollaService = container.get(DEPENDENCIES.DWOLLA_SERVICE)
  const webhookSubscriptions = await dwollaService.webhookSubscription.list()
  const webhookSubscriptionsTotal = get(webhookSubscriptions, 'body.total', -1)
  const webhookSubscriptionsList = get(
    webhookSubscriptions,
    'body._embedded[webhook-subscriptions]',
    []
  )

  const webhookUrl = `${API_URL}/dwolla-webhook`

  const currentWebhookSubscriptions = webhookSubscriptionsList.filter(
    (sub: any) => sub.url === webhookUrl
  )
  if (webhookSubscriptionsTotal === -1) return
  if (
    webhookSubscriptionsTotal === 0 ||
    currentWebhookSubscriptions.length === 0
  ) {
    await dwollaService.webhookSubscription.create()
  }
}

export const updateDwollaBusinessClassifications = async (container: any) => {
  const dwollaService = container.get(DEPENDENCIES.DWOLLA_SERVICE)
  const businessClassificationRepository = container.get(
    DEPENDENCIES.BUSINESS_CLASSIFICATION_REPOSITORY
  )
  const industryClassificationRepository = container.get(
    DEPENDENCIES.INDUSTRY_CLASSIFICATION_REPOSITORY
  )

  const businessClassificationsRequest = await dwollaService.businessClassification.list()
  const businessClassifications = toArray(
    get(
      businessClassificationsRequest,
      'body._embedded[business-classifications]',
      []
    )
  )

  if (businessClassifications.length === 0) return

  businessClassifications.forEach(async (bc: any) => {
    let businessClassificationEntry = await businessClassificationRepository.getOne(
      { id: bc.id }
    )
    if (isNil(businessClassificationEntry)) {
      businessClassificationEntry = await businessClassificationRepository.create(
        {
          id: bc.id,
          name: bc.name
        }
      )
    }

    const industryClassificationsArray = toArray(
      get(bc, '_embedded[industry-classifications]', [])
    )
    industryClassificationsArray.forEach(async (ic: any) => {
      let industryClassificationEntry = await industryClassificationRepository.getOne(
        { id: ic.id }
      )
      if (isNil(industryClassificationEntry)) {
        industryClassificationEntry = await industryClassificationRepository.create(
          {
            id: ic.id,
            name: ic.name,
            businessClassification: businessClassificationEntry
          }
        )
      }
    })
  })
}
