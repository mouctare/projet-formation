<?php

namespace App\Entity;

use App\Entity\Report;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\MediaRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MediaRepository::class)
 *  @ApiResource(
 *  collectionOperations={"GET" , "POST"} , 
*  itemOperations={"GET","PUT" ,"DELETE"},
*)
 */
class Media
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255,nullable=false)
     * @Groups({"medias_read","reports_read"})
     
    */
     
    private $name;

    /**
     * @ORM\Column(type="blob")
     * @Groups({"media_read","reports_read"})
     */
    private $data;

    /**
     * @ORM\ManyToOne(targetEntity=Report::class, inversedBy="media")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"media_read"})
     */
    private $report;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setData($data): self
    {
        $this->data = $data;

        return $this;
    }

    public function getReport(): ?Report
    {
        return $this->report;
    }

    public function setReport(?Report $report): self
    {
        $this->report = $report;

        return $this;
    }
}
