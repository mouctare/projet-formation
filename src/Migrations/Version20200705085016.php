<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200705085016 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE planning CHANGE site_id site_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE report CHANGE site_id site_id INT DEFAULT NULL, CHANGE image image VARCHAR(1000) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD date_created_car_pro DATETIME NOT NULL, ADD expiry_date_card_pro DATETIME NOT NULL, CHANGE roles roles JSON NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE planning CHANGE site_id site_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE report CHANGE site_id site_id INT DEFAULT NULL, CHANGE image image VARCHAR(1000) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE user DROP date_created_car_pro, DROP expiry_date_card_pro, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
    }
}
