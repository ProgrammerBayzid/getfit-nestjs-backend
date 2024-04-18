import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorBankAccountDto {

  @ApiProperty({
    example: 'The City Bank Limited',
    description: 'The Bank name',
  })
  name?: string;

  @ApiProperty({
    example: 'Gazipur SME',
    description: 'The Bank Branch name',
  })
  branchName?: string;

  @ApiProperty({
    example: '020270607',
    description: 'The Bank Routing Name name',
  })
  routingName?: string;

  @ApiProperty({
    example: 'Rony Hosen',
    description: 'The Bank Accounts Holder Name ',
  })
  accountsHolderName?: string;

  @ApiProperty({
    example: '2302526230001',
    description: 'The Bank Account Number',
  })
  accountNumber?: string;

  @ApiProperty({
    example: '+88017566748675',
    description: 'The Bank Accounts Holder Mobile Number',
  })
  mobileNumber?: string;
}
